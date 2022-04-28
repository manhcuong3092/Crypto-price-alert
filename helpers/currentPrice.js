const axios = require("axios");

module.exports = async () => {
  try {
    let url =
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
    const resp = await axios.get(url);
    return {
      error: false,
      data: { BTC: resp.data.price },
    };
  } catch (error) {
     return { error: true };
  }
};