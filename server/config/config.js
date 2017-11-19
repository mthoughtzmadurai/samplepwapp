
const Sequelize = require("sequelize");
const dbSettings = {
  database    : "testdb",
  username    : "sa",
  password    : "p@ssW0rd",
  operatorsAliases: Sequelize.Op,
  options: {
    host    : "127.0.0.1",
    port    : "1433",
    dialect : 'mssql',
    dialectOptions:{
      encrypt : process.env.DB_ENCRYPT || false
    },
    pool: {
      min : 10,
      max : 300,
      idle: 30000,
    }
  }
}




const oktaSettings = {
  orgUrl: process.env.OKTA_ORGANIZATION_URL,
  clientId: process.env.OKTA_CLIENT_ID,
  clientSecret: process.env.OKTA_CLIENT_SECRET,
  apiToken: process.env.OKTA_API_TOKEN
}



module.exports = Object.assign({}, { dbSettings, oktaSettings });
