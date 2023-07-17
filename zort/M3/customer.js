const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Customer } = require('../db_orm/order/Customer') ;

router.get('/getCustomer', async (req, res) => {

    const reqDateCreate = req.body.createdate;
    const data = await Customer.findAll({
        attributes:['customerid','customername','customeridnumber','customerphone','customerstreetAddress','customersubdistrict','customerdistrict','customerprovince','customerpostcode'],
        where: {
            createddate: {
                [Op.like]: `%${reqDateCreate}%`
            }
        }
    }) ;
    
    for(let i =0;i<data.length;i++){
            const Tenphone = data[i].customerphone ; 
            if (Tenphone.length == 12) {
                var phone = Tenphone.substring(2);
            }
            data[i].customerphone = phone
    }
    res.json(data) 
}) ;


module.exports = router;    