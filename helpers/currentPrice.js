const axios = require("axios");

module.exports = async () => {
  try {
    let obj = {};
    const resp = await axios.get("https://api.binance.com/api/v3/ticker/price");
    resp.data.map(pair => {
        if(pair.symbol.match(/\w+USDT$/)) {
            let index = pair.symbol.indexOf("USDT");
            symbol = pair.symbol.substring(0, index);
            obj[symbol] = pair.price;
        }
    });
    return {
      error: false,
      data: obj,
    };
  } catch (error) {
     return { error: true };
  }
};