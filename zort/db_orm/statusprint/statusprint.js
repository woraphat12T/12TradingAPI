const { sequelize,DataTypes } = require('../../connect_mssql/dbconfig') ;

const  status_print = sequelize.define('status_print', {
    id: { type: DataTypes.STRING,allowNull: true,primaryKey:true},
    name: {type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    desciption: {type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
  },{freezeTableName:true,timestamps:false,createdAt:false,updatedAt:false})
  

sequelize.sync({force:true,alter:false})
module.exports = { status_print };