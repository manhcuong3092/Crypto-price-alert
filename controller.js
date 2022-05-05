const currentPrice = require("./helpers/currentPrice");
const { errorObject } = require("./config");
var alerts = require('./alerts');
const coins = require('./coin');
const axios = require('axios');

exports.CurrentPrice = async (req, res) => {
    try {
        let prices = await currentPrice();
        if (prices.error) return res.status(500).json(errorObject);
        return res.status(200).json({
            success: true,
            price_data: prices.data,
        });
    } catch (error) {
        return res.status(500).json(errorObject);
    }
};

exports.CreateAlert = async (req, res) => {
    try {
        let { asset, price, email, type } = req.body;

        if (!asset || !price || !email || !type)   //Check whether all the fields are passed
            return res.status(400).json({
                error: true,
                message: "Please provide the required fields",
            });

        asset = asset.toUpperCase()
        if(coins.indexOf(symbol) === -1) {
            return res.status(400).json({
                error: true,
                message: "This coin doesn't exist.",
            });
        }

        if(type.toLowerCase() !== "above" && type.toLowerCase() !== "below") {
            return res.status(400).json({
                error: true,
                message: "Type must be above or below",
            });
        }

        // Create alert by pushing the object to the alerts array.
        alerts.push({
            asset: asset,
            price: price,
            email: email,
            type: type.toLowerCase(),
            createdAt: new Date(),
        });

        return res.send({ success: true, message: "Alert created" }); //Send response

    } catch (error) {
        console.log(error);
        return res.status(500).json(errorObject);
    }
};

exports.GetAlerts = async (req, res) => {
    return res.send({ success: true, alerts: alerts });
};

exports.GetAllCoins = (req, res) => {
    return res.send(coins);
}

exports.GetOneCoin = async (req, res) => {
    try {
        let symbol = req.params.symbol;
        if(!symbol) {
            res.status(400).send({message: "Coin cannot be empty"});
            return;
        }
        symbol = symbol.toUpperCase()
        if(coins.indexOf(symbol) === -1) {
            res.status(400).send({message: "This coin does not exist"});
        }
        const result = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
        res.send({"symbol": symbol, "price": result.data.price});
    } catch (err) {
        res.send(err.message);
    }
}