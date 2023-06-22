require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: "+08:00",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    timezone: "+08:00",
  },
};
