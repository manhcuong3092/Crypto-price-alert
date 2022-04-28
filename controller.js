const currentPrice = require("./helpers/currentPrice");
const { errorObject } = require("./config");
var alerts = require('./alerts');

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
        const { asset, price, email, type } = req.body;

        if (!asset || !price || !email || !type)   //Check whether all the fields are passed
            return res.status(400).json({
                error: true,
                message: "Please provide the required fields",
            });

        if (asset.toLowerCase() != "btc" && asset.toLowerCase() != "eth")
            return res.status(400).json({
                error: true,
                message: "You can set alerts for BTC and ETH only.",
            });

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
        return res.status(500).json(errorObject);
    }
};

exports.GetAlerts = async (req, res) => {
    return res.send({ success: true, alerts: alerts });
};