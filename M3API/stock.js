const express = require('express');
const router = express.Router();
router.post('/getStock', async(req,res)=>{

    try {
        const stock = [
            {
              itemcode: '10010702007',
              type: [
                {
                  factor: '12',
                  unit: 'BAG'
                },
                {
                  factor: '240',
                  unit: 'CTN'
                }
              ]
            },
          ];
          res.json(stock)
    } catch (error) {
        
    }
})


module.exports = router;    