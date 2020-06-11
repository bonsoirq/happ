## Happ

### Database
In order to configure app for development you need to download [Postgres.app](https://postgresapp.com)

Inside of database terminal run the following commands:
```
create database happ_dev;
create database happ_test;
create user happ;
```

### Configure environment
As a next step you have to create `.env` files in main directory and in `web`

### Confiugre project
For a final step run the following commands:
```
yarn install && cd web && yarn install
cd ..
node migrate up
node seeds/seeds
yarn start:dev
cd web && yarn start
```

### Login credentials
After running `node seeds/seeds` the test account is created. You can see it's e-mail and password in `seeds/seeds.js` file.