# Setup

```
nvm install 14
nvm use 14
```

### Setup your .env

```
cp .env.example .env
```

##### Enter you database vars

<br>

### Install dependencies

```
yarn --frozen-lockfile
```

### Sync Database

```
yarn run typeorm schema:sync
```