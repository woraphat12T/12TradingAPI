const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');
const axios = require('axios'); 
const fs = require('fs') ;

const os = require('os');

require('moment/locale/th');

const router = express.Router();
const logger = require('../logger/logger');

const currentDate = moment().utcOffset(7).format('YYYY-MM-DDTHH:mm:ss');


const productDataZort = require('../res_zort_api/product/all_product');

const { Product } = require('../db_orm/product/product') ;
// const { create } = require('domain');


let createdproduct = 0;
let Updateproduct = 0;
const response = {
    status: '-- complete',
    dateTime: currentDate,
  };
  
  router.get('/getProduct', async (req, res) => {
    try {
        const data = await productDataZort();
        // const formattedData = JSON.stringify(data, null, 2).replace(/\n/g, '') + '\n';
        // const formattedData = JSON.stringify(data, null, '\t').replace(/\n/g, '') + '\n';
        
        logger.info(JSON.stringify(data)) ;
        //fs.writeFileSync("order2.json",JSON.stringify(data))
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error); 
    }
  });

  router.put('/addProduct',async (req, res) => {
    try {
        const { count } = await Product.findAndCountAll({});
          console.log(count);
        
        const data = await productDataZort();
        // const t = await sequelize.transaction();
        logger.info(JSON.stringify(data)) ;
        const data2=data.list ;
        // const datalength=data2.length ; 
        await Product.destroy({truncate: true});
        for (const item of data2) {
            const { imagepath,imageList, ...productData } = item ; 
            // const productObj = Product.build(productData)
            // productObj.save() ;
           await Product.create(productData);
           createdproduct++;

        //  await Product.findOrCreate({where:{id:productData.id},defaults:{...productData}}).then(([product,created]) => {
        //     if(created){
        //         createdproduct++;
        //     }else{
        //         Product.update({...productData},{
        //             where: { 
        //                 id:productData.id,
        //                 [Op.or]: [
        //                     { producttype: { [Op.ne]: productData.producttype } },
        //                     { name: { [Op.ne]: productData.name } },
        //                     { sku: { [Op.ne]: productData.sku } },
        //                     { sellprice: { [Op.ne]: productData.sellprice } },
        //                     { purchaseprice: { [Op.ne]: productData.purchaseprice } },
        //                     { stock: { [Op.ne]: productData.stock } },
        //                     { availablestock: { [Op.ne]: productData.availablestock } },
        //                     { unittext: { [Op.ne]: productData.unittext } },
        //                     { weight: { [Op.ne]: productData.weight } },
        //                     { height: { [Op.ne]: productData.height } },
        //                     { width: { [Op.ne]: productData.width } },
        //                     { categoryid: { [Op.ne]: productData.categoryid } },
        //                     { category: { [Op.ne]: productData.category } },
        //                     { variationid: { [Op.ne]: productData.variationid } },
        //                     { variant: { [Op.ne]: productData.variant } },
        //                     { tag: { [Op.ne]: productData.tag } },
        //                     { sharelink: { [Op.ne]: productData.sharelink } },
        //                     { active: { [Op.ne]: productData.active } },
        //                     { properties: { [Op.ne]: productData.properties } }
        //                 ]
        //               }
        //         }).then(([updatedRows]) => {
        //             if (updatedRows) {
        //                 Updateproduct++;
        //             } else {}
        //         })
        //     }
        // }) ;
         }

         const filePath = `zort/temp_data/product/product.json`;
         console.log(filePath)
         fs.mkdirSync('zort/temp_data/product', { recursive: true });
         data.res = currentDate ;
         fs.writeFileSync(filePath, JSON.stringify(data)+ os.EOL, { flag: 'a' });


        res.status(200).json({response,"is Product":count,"InsertProduct:":createdproduct});
        createdproduct = 0;
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
  });


  router.post('/updateAvailableStock',async(req, res) =>{
    
    const apiUrl = 'https://open-api.zortout.com/v4/Product/UpdateProductAvailableStockList';
    const headers = {
        storename: 'kissjbindai@gmail.com',
        apikey: 'NEWZNnvQR8EcxCAmNoiq0Pkxok/MPfJr0tphlmKxk=',
        apisecret: 'pCjCvh1EVGkLEz8O5Chsk4Wci1kJTzN6T0vSpFZXdM=',
    };
    const body = { sku: '10101030999_T', stock: 12};
    const params = { warehousecode: 'w0001',};

    try {
        const response = await axios.post(apiUrl, body, {
          headers: headers,
          params: params
        });
        //console.log('Response:', response.data);
        res.status(200).json(response.data)
      } catch (error) {
       //console.error('Error:', error.response.data);
       res.status(500).json(error)
      }
  }) ;
  module.exports = router;   