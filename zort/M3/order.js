const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Order,OrderDetail } = require('../db_orm/order/Order') ;

router.post('/getOrder', async (req, res) => {
    const reqDateCreate = req.body.createdate;
    var tab = req.body.tab ;
    if(tab == ''){
        if(tab == 'all-tab'){
            const data = await Order.findAll({}) ;
            res.json(data) 
        }else {
            if(tab == 'taxinv-tab'){
                tab = 'Success'
            }else if(tab == 'tracking-tab'){
                tab = 'Waiting'
            }else if(tab == 'print-tab'){
                tab = 'print'
            }else if(tab == 'success-tab'){
                tab = 'complete'
            }
            const data = await Order.findAll({where: {status:tab}}) ;
            res.json(data) 
        }
    }else{
        if(reqDateCreate == ''){
            const data = await Order.findAll({
                attributes: ['id', 'saleschannel', 'orderdate', 'number', 'customerid', 'status', 'paymentstatus', 'amount', 'vatamount', 'shippingchannel', 'shippingamount', 'shippingstreetAddress', 'shippingsubdistrict', 'shippingdistrict', 'shippingprovince', 'shippingpostcode'],
                where: {
                  statusprint: {
                    [Op.like]: `%wait_print%`
                  }
                }
              });
        }else{
            const data = await Order.findAll({
                attributes: ['id', 'saleschannel', 'orderdate', 'number', 'customerid', 'status', 'paymentstatus', 'amount', 'vatamount', 'shippingchannel', 'shippingamount', 'shippingstreetAddress', 'shippingsubdistrict', 'shippingdistrict', 'shippingprovince', 'shippingpostcode'],
                where: {
                  createdatetimeString: {
                    [Op.like]: `%${reqDateCreate}%`
                  }
                }
              });
            
        }
       

            const lorder = data.length ;
            const orders = [];

            for (let i = 0; i < data.length; i++) {
            const itemData = await OrderDetail.findAll({
                attributes: ['productid', 'sku', 'name', 'number', 'pricepernumber', 'totalprice'],
                where: {
                id: data[i].id
                }
            });

            const items = itemData.map(item => ({
                productid: item.productid,
                sku: item.sku,
                name: item.name,
                number: item.number,
                pricepernumber: item.pricepernumber,
                totalprice: item.totalprice
            }));

            const order = {
                id: data[i].id,
                saleschannel: data[i].saleschannel,
                orderdate: data[i].orderdate,
                number: data[i].number,
                customerid: data[i].customerid,
                status: data[i].status,
                paymentstatus: data[i].paymentstatus,
                amount: data[i].amount,
                vatamount: data[i].vatamount,
                shippingchannel: data[i].shippingchannel,
                shippingamount: data[i].shippingamount,
                shippingstreetAddress: data[i].shippingstreetAddress,
                shippingsubdistrict: data[i].shippingsubdistrict,
                shippingdistrict: data[i].shippingdistrict,
                shippingprovince: data[i].shippingprovince,
                shippingpostcode: data[i].shippingpostcode,
                item: items
            };

            orders.push(order);
        }

        res.json(orders);
    }

}) ;


module.exports = router;    