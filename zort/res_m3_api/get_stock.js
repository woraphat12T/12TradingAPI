const axios = require('axios'); 
const stock = async (req,res) => {
  try {
    const response = await axios.get('http://192.168.2.97:8383/M3/getStock', {
        headers: {
          storename: 'lotukbeyou@gmail.com',
          apikey: 'PQxaH0Xfor9GmM5FQPZqHRUvGygvjzhtuFQJNjIrM2U=',
          apisecret: 'nKSUWfG8I3RG2RSIKzk6TIh7WLcz5MRvUrxJtzhO8pw=',
          Authorization: `Bearer IT_12`
        },
      });
      
  //    res.json(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' });
  }
};

module.exports = stock; 