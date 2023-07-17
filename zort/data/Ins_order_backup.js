const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');


const fs = require('fs') ;
const os = require('os');

require('moment/locale/th');

const router = express.Router();
const logger = require('../logger/logger');
const currentDate = moment().utcOffset(7).format('YYYY-MM-DDTHH:mm');

const orderDataZort = require('../res_zort_api/order/all_order');

const { Order, OrderDetail } = require('../db_orm/order/Order') ;
const { Customer,ShippingAddress } = require('../db_orm/order/Customer') ;

const { connectMssql } = require('../connect_mssql/dbconfig')

let createdCount = 0;
let createdShipCount = 0;
let updatedCount = 0;
const response = {
    status: '-- complete',
    dateTime: currentDate,
  };
   
  router.get('/getOrder', async (req, res) => {
    try {
      const data = await orderDataZort();
      // const formattedData = JSON.stringify(data, null, 2).replace(/\n/g, '') + '\n';
      // const formattedData = JSON.stringify(data, null, '\t').replace(/\n/g, '') + '\n';
      
      logger.info(JSON.stringify(data)) ;
      //fs.writeFileSync("order2.json",JSON.stringify(data))
      
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the data.' });
    }
  });  
  var sql = require("mssql");
  router.put('/addOrder',async(req, res)=>{
    try {
      const data = await orderDataZort() ;
      //  logger.info(JSON.stringify(data)) ;
      const data2=data.list ;
      const datalength=data2.length ;
      await OrderDetail.destroy({truncate: true});
      for (const item of data2) {
          const { payments,trackingList,tag, ...orderData } = item ; 

          // await Order.findOrCreate({where:{id:orderData.id},defaults:{...orderData}})

          // await Order.update({...orderData},{where:{id:orderData.id}})

          // await Order.create(orderData) ;
           const createdUsers = await Order.bulkCreate([orderData]);
   
          // console.log(createdUsers)
          createddate = currentDate;
          const { customerid, customername, customercode ,customeridnumber,customeremail,customerphone,customeraddress,customerpostcode,customerprovince,customerdistrict,customersubdistrict,customerstreetAddress,customerbranchname,customerbranchno,facebookname,facebookid,line,lineid} = item;
        // await  Customer.findOrCreate({where:{customerid:item.customerid},defaults:{...item,createddate:currentDate}}).then(async ([customer, created]) => {
        //     if (created) {
        //       createdCount++;
        //     } else {
        //      await Customer.update({customeraddress:item.customeraddress},{
        //         where: { 
        //           customerid:item.customerid,
        //           customeraddress:{
        //             [Op.ne]: item.customeraddress
        //           }
        //         }
        //       }).then(([updatedRows]) => {
        //         if (updatedRows) {
        //           updatedCount++;
        //         } else {}
        //       })
        //     } 
        //   }); 
     
          // await Customer.upsert({where:{customerid:item.customerid},defaults:{...item}}); 

          item.shi_customerid = item.customerid ;
          const { shi_customerid,shippingname,shippingaddress,shippingphone,shippingemail,shippingpostcode,shippingprovince,shippingdistrict,shippingsubdistrict,shippingstreetAddress } = item ;
          await ShippingAddress.create(item); 
         await ShippingAddress.findOrCreate({ where: { shippingaddress: shippingaddress }, defaults: { ...item} }).then(([shippingaddress,created]) => {
            if (created) {
              createdShipCount++;
            } else {}
          });
      }

      for(let i=0;i<datalength;i++){
          for(const list of data2[i].list){
            // console.log(data2[i].id)
            const { auto_id, ...orderDatadetail } = list ; 
            orderDatadetail.id = data2[i].id ;
           await  OrderDetail.bulkCreate([orderDatadetail])
            //  await OrderDetail.findOrCreate(orderDatadetail)
            // const createdUsers = await Order.bulkCreate([orderData]);
          }
      }
      // res.status(200).json(data2);
      res.status(200).json({response,'Inser_cus: ':createdCount,'Update_cus: ':updatedCount,'Insert_ShipAdd:':createdShipCount});
      updatedCount=0 ;
      createdCount=0;
      createdShipCount=0;
      // fs.mkdirSync('zort/temp_data', { recursive: true });
      // fs.writeFileSync("zort/temp_data/order.json",JSON.stringify(data)+ os.EOL,{ flag: 'a' })
    } catch (error) {
      console.log(error)
      res.status(500).json(error) 
    } 
  }); 
 
module.exports = router;   