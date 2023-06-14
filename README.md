# invoice-app-backend

Backend for [invoiceGenie](https://github.com/hWeitian/invoice-app-frontend)

## Setup and Run

- `npm i` to install dependencies
- Install and start postgresql database locally
- `npx sequelize db:create` to create database
- `npx sequelize db:migrate` to create tables
- `npx sequelize db:seed:all` to create seed data
- Clone and setup frontend at [invoice-app-frontend](https://github.com/hWeitian/invoice-app-frontend)
- Create an [Auth0](https://auth0.com/) account and setup an Auth0 API and Applications
- Create a [SendGrid](https://sendgrid.com/) account, setup Sending Identity and generate an API key
- Configure `.env` file, make sure to get your own API keys stated below and insert it into your `.env` file
  ```
  AUDIENCE= <Auth0 Domain>
  AUTH_CLIENTID= <Auth0 client id>
  AUTH_CONNECTION= <Auth0 database name>
  AUTH_CONNECTION_ID= <Auth0 Authentication database identifier>
  AUTH_DOMAIN= <Auth0 API domain>
  AUTH_REDIRECTURL= <Frontend Application URL>
  AUTH_SECRET= <Auth0 Machine to Machine client secret key>
  AUTH_TEMP_PW= <Temporary Password - Can be anything>
  AUTH_URL= <Auth0 URL>
  BASEURL= <Auth0 base URL>
  SENDGRID_API_KEY= <SendGrid API Key>
  SG_EMAIL= <Email address configured in SendGrid>
  ```
- `npm start` to start database locally
