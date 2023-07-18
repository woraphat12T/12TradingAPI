const { sequelize,DataTypes } = require('../../connect_mssql/dbconfig') ;

const orderMovement = sequelize.define('orderMovement', {

    id: { type: DataTypes.INTEGER,allowNull: false,primaryKey: true,},
    statusStock: {type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},

},{freezeTableName:true,timestamps:false,createdAt:false,updatedAt:false})

sequelize.sync({force:false,alter:false})
module.exports = { orderMovement }; 