const express = require("express");

const router = express.Router();

const Controller = require("./controller");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Thông báo biến động giá.' });
});

router.post("/priceAlert", Controller.CreateAlert);

router.get("/prices", Controller.CurrentPrice);

router.get("/alerts", Controller.GetAlerts);

router.post("/alert", Controller.CreateAlert);

router.get("/coin", Controller.GetAllCoins);

router.get("/coin/:symbol", Controller.GetOneCoin);

module.exports = router;