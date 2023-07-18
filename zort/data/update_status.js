
const express = require('express');
const moment = require('moment');
const { Op } = require('sequelize');


const router = express.Router();
const logger = require('../logger/logger');

const { Order } = require('../db_orm/order/Order') ;


router.put('/updateStatus',async(req, res)=>{
    var checkList = req.body.checkList ;
    try {
      if(checkList == 'all'){
        const updateCheck = await Order.update({statusprint:'001'},{where:{statusprint:'000'}}) ;
        res.status(200).json({updateCheck})
      }else{
        const updateCheck = await Order.update({statusprint:'001'},{where:{id:checkList}}) ;
        res.status(200).json({updateCheck})
      }
    } catch (error) {
      res.status(500).json('invalid data')
    }
})

module.exports = router;   