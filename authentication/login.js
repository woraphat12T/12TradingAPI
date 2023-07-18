const express = require('express');
const jwt = require('jsonwebtoken');
const { mssql,connectMssql } = require('../zort/connect_mssql/dbconfig')
const router = express.Router();

router.post('/login',async(req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
    
  const pool = await mssql.connect(connectMssql);
  const request = pool.request();
  const result = await request.query(`SELECT password FROM users WHERE name = '${username}'`);
  const user = result.recordset[0];
  // res.json(password);
// res.json(user.password)
if (result.recordset.length > 0) {
    if (user.password === password) {
    const token = jwt.sign({ username: user.name },'it');
    res.json({status:1,token,username})
    } else {
      res.json({status:0});
    }
  }else{
    res.json({status:2});
  }

}) ; 

router.get('/login/verify',async(req,res)=>{

  res.status(401).json('complete')

})

module.exports = router