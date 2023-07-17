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

const { sequelize,connectMssql,QueryTypes } = require('../connect_mssql/dbconfig')

let createdCount = 0;
let createdShipCount = 0;
let updatedCount = 0;
const response = {
    status: '-- complete',
    dateTime: currentDate,
  };
   
  router.get('/getOrder', async (req, res) => {
    try {
      // const data = await orderDataZort();
      // const formattedData = JSON.stringify(data, null, 2).replace(/\n/g, '') + '\n';
      // const formattedData = JSON.stringify(data, null, '\t').replace(/\n/g, '') + '\n';
      const id = '109215792'
      const [results, metadata] = await sequelize.query("SELECT * FROM [DATA_ZORT].[dbo].[order] WHERE id = ?",{
        replacements: [id],
      type: sequelize.QueryTypes.SELECT
      });

      // logger.info(JSON.stringify(data)) ;
      //fs.writeFileSync("order2.json",JSON.stringify(data))
      
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the data.' });
    }
  });  

  router.put('/addOrder',async(req, res)=>{
    try {
      const data = await orderDataZort() ;
      //  logger.info(JSON.stringify(data)) ;
      await OrderDetail.destroy({truncate: true});
      const data2=data.list ;
      const datalength=data2.length ;
        for(let i=0;i<datalength;i++){

            const query = `
            IF EXISTS (SELECT id FROM [dbo].[order] WHERE id = `+data2[i].id+`) 
            BEGIN
              UPDATE [dbo].[order]
              SET [status] = :value6,
                  paymentstatus = :value7
              WHERE [id] =`+data2[i].id+`;
            END
            ELSE
            BEGIN
            INSERT INTO [dbo].[order] (id,[ordertype],[number],[customerid],[warehousecode],[status],[paymentstatus],[marketplacename],[marketplaceshippingstatus],[marketplacepayment],[amount],[vatamount] ,[shippingvat],[shippingchannel],
            [shippingamount],[shippingdate],[shippingdateString],[shippingname],[shippingaddress] ,[shippingphone] ,[shippingemail],[shippingpostcode],[shippingprovince],[shippingdistrict] ,[shippingsubdistrict],[shippingstreetAddress],
            [orderdate],[orderdateString],[paymentamount],[description],[discount],[platformdiscount],[sellerdiscount],[shippingdiscount],[discountamount],[voucheramount],[vattype],[saleschannel],[vatpercent],[isCOD],[createdatetime],
            [createdatetimeString],[updatedatetime],[updatedatetimeString],[expiredate],[expiredateString],[receivedate],[receivedateString],[totalproductamount],[uniquenumber],[properties],[isDeposit]) 
            VALUES (:value1,:value2,:value3,:value4,:value5,:value6,:value7,:value8,:value9,:value10,:value11,:value12,:value13,:value14,:value15,:value16,:value17,:value18,:value19,:value20,:value21,:value22,:value23,:value24,:value25,
            :value26,:value27,:value28,:value29,:value30,:value31,:value32,:value33,:value34,:value35,:value36,:value37,:value38,:value39,:value40,:value41,:value42,:value43,:value44,:value45,:value46,:value47,:value48,:value49,:value50,:value51,:value52)
            END
            `;
            const replacements = {
              value1: data2[i].id,                        value11: data2[i].amount,             value21: data2[i].shippingemail,        value31: data2[i].discount,         value41: data2[i].createdatetime,       value51: data2[i].properties,
              value2: data2[i].ordertype,                 value12: data2[i].vatamount,          value22: data2[i].shippingpostcode,     value32: data2[i].platformdiscount, value42: data2[i].createdatetimeString, value52: data2[i].isDeposit,
              value3: data2[i].number,                    value13: data2[i].shippingvat,        value23: data2[i].shippingprovince,     value33: data2[i].sellerdiscount,   value43: data2[i].updatedatetime,       
              value4: data2[i].customerid,                value14: data2[i].shippingchannel,    value24: data2[i].shippingdistrict,     value34: data2[i].shippingdiscount, value44: data2[i].updatedatetimeString, 
              value5: data2[i].warehousecode,             value15: data2[i].shippingamount,     value25: data2[i].shippingsubdistrict,  value35: data2[i].discountamount,   value45: data2[i].expiredate,           
              value6: data2[i].status,                    value16: data2[i].shippingdate,       value26: data2[i].shippingstreetAddress,value36: data2[i].voucheramount,    value46: data2[i].expiredateString,     
              value7: data2[i].paymentstatus,             value17: data2[i].shippingdateString, value27: data2[i].orderdate,            value37: data2[i].vattype,          value47: data2[i].receivedate, 
              value8: data2[i].marketplacename,           value18: data2[i].shippingname,       value28: data2[i].orderdateString,      value38: data2[i].saleschannel,     value48: data2[i].receivedateString, 
              value9: data2[i].marketplaceshippingstatus, value19: data2[i].shippingaddress,    value29: data2[i].paymentamount,        value39: data2[i].vatpercent,       value49: data2[i].totalproductamount, 
              value10: data2[i].marketplacepayment,       value20: data2[i].shippingphone,      value30: data2[i].description,          value40: data2[i].isCOD,            value50: data2[i].uniquenumber, 
            }
            const result = await sequelize.query(query, {
              replacements,
              type: sequelize.QueryTypes.INSERT
            });
            console.log(result)
        }

        for (const item of data2) {
            createddate = currentDate;
            const { customerid, customername, customercode ,customeridnumber,customeremail,customerphone,customeraddress,customerpostcode,customerprovince,customerdistrict,customersubdistrict,customerstreetAddress,customerbranchname,customerbranchno,facebookname,facebookid,line,lineid} = item;
            await  Customer.findOrCreate({where:{customerid:item.customerid},defaults:{...item,createddate:currentDate}}).then(async ([customer, created]) => {
            if (created) {
              createdCount++;
            } else {
             await Customer.update({customeraddress:item.customeraddress},{
                where: { 
                  customerid:item.customerid,
                  customeraddress:{
                    [Op.ne]: item.customeraddress
                  }
                }
              }).then(([updatedRows]) => {
                if (updatedRows) {
                  updatedCount++;
                } else {}
              })
            } 
          });

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
              // await OrderDetail.findOrCreate({ where: { shippingaddress: shippingaddress }, defaults: { ...orderDatadetail} })
            // const createdUsers = await Order.bulkCreate([orderData]);
          }
      }

      res.status(200).json({response,'Inser_cus: ':createdCount,'Update_cus: ':updatedCount,'Insert_ShipAdd:':createdShipCount});
      updatedCount=0 ;
      createdCount=0;
      createdShipCount=0;
    } catch (error) {
      console.log(error)
      res.status(500).json(error) 
    } 
  }); 
 
module.exports = router;   