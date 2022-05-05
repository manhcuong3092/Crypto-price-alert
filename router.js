const express = require("express");
var alerts = require("./alerts");
var coins = require("./coin");

const router = express.Router();

const Controller = require("./controller");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { coins, alerts, title: 'Thông báo biến động giá.' });
});

router.post("/priceAlert", Controller.CreateAlert);

router.get("/prices", Controller.CurrentPrice);

router.get("/alerts", Controller.GetAlerts);

router.post("/alert", Controller.CreateAlert);

router.get("/coin", Controller.GetAllCoins);

router.get("/coin/:symbol", Controller.GetOneCoin);

module.exports = router;