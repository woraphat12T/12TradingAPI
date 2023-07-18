const { sequelize,DataTypes } = require('../../connect_mssql/dbconfig') ;

const Customer = sequelize.define('customer', {
    autoCusId:{ type: DataTypes.INTEGER,allowNull: false,primaryKey: true,autoIncrement: true},
    customerid: { type: DataTypes.INTEGER,allowNull: true},
    customername:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customercode:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customeridnumber:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customeremail:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customerphone:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customeraddress:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customerpostcode:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customerprovince:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customerdistrict:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customersubdistrict:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customerstreetAddress:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customerbranchname:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    customerbranchno:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    facebookname:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    facebookid:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    line:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    lineid:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    createddate:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
},{freezeTableName:true,timestamps:true,createdAt:false,updatedAt:false})
 
const ShippingAddress = sequelize.define('ShippingAddress', {
    autoAddId:{ type: DataTypes.INTEGER,allowNull: false,primaryKey: true,autoIncrement: true},
    shi_customerid: { type: DataTypes.INTEGER,allowNull: true},
    shippingname:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingaddress:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingphone:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingemail:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingpostcode:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingprovince:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingdistrict:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingsubdistrict:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
    shippingstreetAddress:{type: DataTypes.STRING,collate: 'Thai_CI_AS',allowNull: true,},
},{freezeTableName:true,timestamps:true,createdAt:true,updatedAt:true})

// OrderDetail.belongsTo(Order);   
// Order.hasOne(OrderDetail);  

sequelize.sync({force:false,alter:false})  
module.exports = { Customer,ShippingAddress };
