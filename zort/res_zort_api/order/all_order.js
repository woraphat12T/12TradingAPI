const axios = require('axios'); 
const orderDataAll = async (req,res) => {
  try {
    const response = await axios.get('https://open-api.zortout.com/v4/Order/GetOrders', {
        headers: {
          storename: 'lotukbeyou@gmail.com',
          apikey: 'PQxaH0Xfor9GmM5FQPZqHRUvGygvjzhtuFQJNjIrM2U=',
          apisecret: 'nKSUWfG8I3RG2RSIKzk6TIh7WLcz5MRvUrxJtzhO8pw=',
        },
      });
  
  //    res.json(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' });
  }
};

module.exports = orderDataAll;