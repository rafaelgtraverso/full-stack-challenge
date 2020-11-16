const CoinbasePro = require('coinbase-pro');
const _ = require('lodash');
const axios = require('axios');

const publicClient = new CoinbasePro.PublicClient();

module.exports = async function(app){
    let exchangesBTC = [];
    try{
        const res = await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT')
        if(res){
            exchangesBTC.push({exchange: 'binance', usdAmount:res.data.price});
        }
        await publicClient.getProductTicker("BTC-USD")
            .then((data) => {
                exchangesBTC.push({exchange: 'coinbase', usdAmount:data.price});
            })
            .catch(err => console.log(err))

    }catch (err){console.log(err);}

    app.get('/exchange-routing', (req,res) => {
        let cheapestExchange =_.maxBy(exchangesBTC,'usdAmount');

        if(req.query.amount){
            res.send({amount: req.query.amount,...cheapestExchange, totalCost: cheapestExchange.usdAmount*req.query.amount});
        }else{
            res.send("The amount of bitcoins is missing");
        }
    });


};