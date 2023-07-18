const express = require('express');
const cors = require('cors');

const { exec } = require('child_process');
//Route zort
// const orderData = require('./zort/route/orderRoute') ;
// const productData = require('./zort/route/productRoute') ;

const orderDataAll = require('./zort/data/Ins_order') ;
const productDataAll = require('./zort/data/Ins_product') ;
const orderUpdate = require('./zort/data/update_status') ;


//Route Api bra bra
//
//Route TO M3
const customerToM3 = require('./zort/M3/customer') ;
const ordereToM3 = require('./zort/M3/order') ;
const ordereToM3Tab = require('./zort/M3/Rest_order') ;
const updateStockZort = require('./zort/M3/updateStock') ;


//M3API
const stock = require('./M3API/stock')

const app = express();
app.use(cors());
app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token === 'IT_12') { 
        return next();
    }else if(token === ''){

    }
    res.sendStatus(401);
}

const loginTokent = require('./authentication/login') ;


app.use(authenticateToken);

app.get('/',authenticateToken,function (req, res) {
    try{
        res.status(200).json({statusApis:"Welcome to 12Trad APIs"});
        const command = 'node node-thermal-printer/examples/example.js tcp://192.168.44.212';
        exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`เกิดข้อผิดพลาด: ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`มีข้อผิดพลาดในการรันคำสั่ง: ${stderr}`);
              return;
            }
            console.log(`ผลลัพธ์: ${stdout}`);
          });
        

    } catch(error){
        console.error(error);
        res.status(500).json(error);
    }
});

//route order /zort/order/*** 
app.use('/zort/order',authenticateToken,orderDataAll) ;
app.use('/zort/product',authenticateToken,productDataAll) ;

app.use('/zort/order',authenticateToken,orderUpdate) ;

//RESTAPI TO M3
app.use('/12Trading',authenticateToken,customerToM3) ;
app.use('/12Trading',authenticateToken,ordereToM3) ;
app.use('/12Trading',authenticateToken,ordereToM3Tab) ;
app.use('/12Trading',authenticateToken,updateStockZort) ;

//zort front end
 app.use('/12Trading',authenticateToken,loginTokent) ;


 //M3API
 app.use('/M3',authenticateToken,stock)
 
app.listen(8383, () => {
    console.log('Server is running on port 8080');
}); 