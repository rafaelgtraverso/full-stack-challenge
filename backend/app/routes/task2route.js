const CoinbasePro = require('coinbase-pro');
const _ = require('lodash');
const axios = require('axios');

const publicClient = new CoinbasePro.PublicClient();

module.exports = async function(app){
    let exchangesBTC = [];
    try{
        const res = await axios.get('https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5')
        if(res){
            exchangesBTC.push({exchange: 'binance', data:_.min(res.data.asks)});
        }
        await publicClient.getProductOrderBook("BTC-USD")
            .then((data) => {
                exchangesBTC.push({exchange: 'coinbase', data:data.asks});
            })
            .catch(err => console.log(err))
    }catch (err){console.log(err);}

    app.get('/compare-exchanges', (req,res) => {
            const bestExchange = (_.minBy(exchangesBTC,'data'));
            const bestPrice = bestExchange.data[0]
            const orderTotal = bestPrice * req.query.amount;
            if(req.query.amount){
                res.send("The best price to buy is with "+ bestExchange.exchange + " at "+ bestPrice +" per BTC. Order total: "+ orderTotal);
            }else{
                res.send("The amount of bitcoins you want to buy is missing");
            }

    });


};