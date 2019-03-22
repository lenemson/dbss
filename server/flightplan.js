const fs = require('fs');
const plan = require('flightplan');
const dotenv = require('dotenv');

const env = dotenv.config();

if (env.error) {
  console.log('.env file not found');
  throw env.error;
}

plan.target('staging', {
  host: process.env.DBSS_STAGING_HOST,
  username: process.env.DBSS_STAGING_USERNAME,
  privateKey: process.env.DBSS_STAGING_PK_PATH,
  agent: process.env.SSH_AUTH_SOCK
});

plan.target('production', {
  host: process.env.DBSS_PRODUCTION_HOST,
  username: process.env.DBSS_PRODUCTION_USERNAME,
  privateKey: process.env.DBSS_PRODUCTION_PK_PATH,
  agent: process.env.SSH_AUTH_SOCK
});

/**
 * Deploy
 */

plan.remote('deploy', (transport) => {
  transport.failsafe();
  transport.exec('rm -rf dbss-prev');
  transport.exec('mv dbss-current dbss-prev');
  transport.unsafe();
});

plan.local('deploy', (transport) => {
  const ls = transport.exec('git ls-files src', { silent: true });
  const sourceFiles = ls.stdout.split('\n').filter(Boolean);
  transport.transfer([
    ...sourceFiles,
    'package.json',
    'package-lock.json',
    'dbss.service',
  ], 'dbss-current');
});

plan.remote('deploy', (transport) => {
  transport.with('cd dbss-current', () => {
    transport.exec('npm install --production');
    transport.exec('sudo cp dbss.service /etc/systemd/system/');
  });

  const input = transport.prompt('Is this the first deployment? [y/n]');
  if (input.toLowerCase().indexOf('y') >= 0) {
    transport.exec('sudo systemctl enable dbss.service');
    transport.exec('sudo systemctl start dbss.service');
  } else {
    transport.exec('sudo systemctl daemon-reload');
    transport.exec('sudo systemctl restart dbss.service');
  }
});

/**
 * Revert deploy
 */

plan.remote('revert', (transport) => {
  transport.exec('mv dbss-current dbss-tmp');
  transport.exec('mv dbss-prev dbss-current');
  transport.exec('mv dbss-tmp dbss-prev');
  transport.with('cd dbss-current', () => {
    transport.exec('sudo cp dbss.service /etc/systemd/system/');
  });
  transport.exec('sudo systemctl daemon-reload');
  transport.exec('sudo systemctl restart dbss.service');
});

/**
 * Restart game server
 */

plan.remote('restart', (transport) => {
  transport.exec('sudo systemctl restart dbss.service');
});
