const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Order,OrderDetail } = require('../db_orm/order/Order') ;

router.post('/getOrderTab', async (req, res) => {
    var page = req.body.page;
    var tab = req.body.tab ;
    try {

        if(page == 'recipt'){
            if(tab == 'wait-tab'){
                const data = await Order.findAll({where:{statusprint:'000'}}) ;
                res.json(data) 
            }else if(tab == 'success-tab'){
                const data = await Order.findAll({where:{statusprint:'002'}}) ;
                res.json(data) 
            }
        }else if(page == 'all'){
    
        }else if(page == 'inv'){
    
        }
   
    } catch (error) {
        res.status(500).json('invalid data')
    }

})

module.exports = router;    