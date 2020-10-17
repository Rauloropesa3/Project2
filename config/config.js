/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
require("dotenv").config();

module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "workoutBud_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
// eslint-disable-next-line semi
}
