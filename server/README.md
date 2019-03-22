### Game server

## Development

`npm start`

## Deployment

`fly deploy:{staging|production}`

# Remote server setup

Log in as `root` user, add an user with sudo:

```
adduser dbss
usermod -aG sudo dbss
```

Log in as `dbss` user.
Put ssh public key in `/home/dbss/.ssh/authorized_keys`.

Add passwordless rights for some commands:

`sudo visudo -f /etc/sudoers.d/dbss`
```
Cmnd_Alias DBSS_COPY_SERVICE = /bin/cp dbss.service /etc/systemd/system/
Cmnd_Alias DBSS_SYSTEMCTL = /bin/systemctl * dbss.service

dbss ALL=(ALL) NOPASSWD: DBSS_COPY_SERVICE, DBSS_SYSTEMCTL, /bin/systemctl daemon-reload
```

Install node via nvm:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm install v10.15.3
```

# Local setup

Create a `.env` file next to the `package.json` containing at least:

```
DBSS_STAGING_HOST=xxx.xxx.xxx.xxx
DBSS_STAGING_USERNAME=dbss
DBSS_STAGING_PK_PATH=/local/path/to/ssh/private/key
```
