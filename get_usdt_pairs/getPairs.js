var request = require('request');
var fs = require('fs')
var quote = "USDT"
var options = {
    'method': 'GET',
    'url': 'https://api.binance.com/api/v1/exchangeInfo',
    'headers': {
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(JSON.parse(response.body));
    var symbols = JSON.parse(response.body).symbols
    var justUSDTpairs = symbols.map((x) => {
        if (x.quoteAsset.includes(quote)) {
            return x.baseAsset
        }
    }).filter((x) => { if (x) { return x } })
    fs.writeFileSync('allTargets', JSON.stringify(justUSDTpairs))
}); 
