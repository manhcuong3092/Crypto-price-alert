const CronJob = require("cron").CronJob;
var Queue = require("bull");

const alerts = require("../alerts");
const config = require("../config");

const currentPrice = require("../helpers/currentPrice");
const sendEmailNotification = require("../helpers/sendEmailNotification");

var alertQueue = new Queue("alerts", config.REDIS_URL); //Create a queue

alertQueue.process(async function (job, done) {   //Consumer process
    const { recipient, title, message } = job.data;

    let sendEmailResponse = await sendEmailNotification(
        recipient,
        message,
        title
    );
    if (sendEmailResponse.error) {
        done(new Error("Error sending alert"));
    }
    done();
});

var sendAlert = new CronJob("*/5 * * * * *",   // Execute every 5 seconds
    async function () {
        const priceObj = await currentPrice();
        if (priceObj.error) return;
        const pairs = priceObj.data;
        console.log(priceObj)
        console.log("BTC:", priceObj.data.BTC)
        console.log(alerts)

        alerts.forEach((alert, index) => {
            let message, title, recipient;
            if (
                alert.type == "above" &&
                parseFloat(alert.price) <= parseFloat(pairs[alert.asset])
            ) {
                message = `Price of ${alert.asset} has just exceeded your alert price of ${alert.price} USD.
      Current price is ${pairs[alert.asset]} USD.`;
                title = `${alert.asset} is up!`;
                recipient = alert.email;

                alertQueue.add(                    //Add to queue (Producer)
                    { message, recipient, title },
                    {
                        attempts: 3,                    // Retry 3 times for every 3 seconds
                        backoff: 3000,
                    }
                );
                console.log(message)

                alerts.splice(index, 1)  // remove the alert once pushed to the queue.

            } else if (
                alert.type == "below" &&
                parseFloat(alert.price) > parseFloat(pairs[alert.asset])
            ) {
                message = `Price of ${alert.asset} fell below your alert price of ${alert.price}.
      Current price is ${pairs[alert.asset]} USD.`;

                recipient = alert.email;
                title = `${alert.asset} is down!`;

                alertQueue.add(                   //Add to queue (Producer)
                    { message, recipient, title },
                    {
                        attempts: 3,
                        backoff: 3000,
                    }
                );
                console.log(message)
                alerts.splice(index, 1)  // remove the alert once pushed to the queue.
            }
        });
    });

sendAlert.start();