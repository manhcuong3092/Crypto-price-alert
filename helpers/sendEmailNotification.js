const nodemailer = require("nodemailer");
const config = require("../config");

module.exports = async (email, message, title) => {
  try {
    const smtpEndpoint = "smtp.gmail.com";  //SMTP server

    const port = 465;

    const senderAddress = config.USERNAME;

    var toAddress = email;

    const smtpUsername = config.USERNAME;

    const smtpPassword = config.PASSWORD;

    var subject = title;

    var body_html = `<html><p>${message}</p></html>`;

    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };

    await transporter.sendMail(mailOptions);  //Send the mail.

    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Couldn't send email",
    };
  }
};