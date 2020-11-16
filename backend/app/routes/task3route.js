const CoinbasePro = require('coinbase-pro');
const _ = require('lodash');
const axios = require('axios');

const publicClient = new CoinbasePro.PublicClient();

module.exports = async function(app){
    let exchangesBTC = [];
    try{
        const resBinance = await axios.get('https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5')
        if(resBinance){
            exchangesBTC.push({exchange: 'Binance', data:_.min(resBinance.data.asks)});
        }
        await publicClient.getProductOrderBook("BTC-USD")
            .then((data) => {
                exchangesBTC.push({exchange: 'Coinbase', data:data.asks});
            })
            .catch(err => console.log(err))
        const resKraken = await axios.get('https://api.kraken.com/0/public/Depth?pair=XBTUSDT')
        if(resKraken){
            exchangesBTC.push({exchange: 'Kraken', data:_.min(resKraken.data.result.XBTUSDT.asks)});
        }
    }catch (err){console.log(err);}

    app.get('/compare-exchanges2', (req,res) => {
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