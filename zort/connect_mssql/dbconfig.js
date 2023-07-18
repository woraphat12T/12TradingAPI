const { Sequelize,DataTypes,QueryTypes } = require('sequelize');
const mssql = require('mssql');

const sequelize = new Sequelize('DATA_ZORT', 'sa', 'P@ssw0rd', {
  dialect: 'mssql',
  host: '192.168.2.97',
});


const connectMssql = {
  server: '192.168.2.97',
  database: 'DATA_AUTH',
  user: 'sa',
  password: 'P@ssw0rd',
  options: {
    encrypt: false
  },
};
 

module.exports = {
    sequelize: sequelize,
    DataTypes: DataTypes,
    connectMssql : connectMssql,
    mssql : mssql,
    QueryTypes:QueryTypes
};
   