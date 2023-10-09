const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");

const corsHandler = cors({
  origin: true,
});
const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: "traibo-dev@outlook.com",
    pass: "ntWP2C1waCeENsoDBkRX",
  },
});

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); // <-- Modify this line

// ... [rest of your code]

exports.sendEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    // <-- Use the cors middleware here
    const { email, message } = req.body;

    const mailOptions = {
      from: "traibo-dev@outlook.com",
      to: email,
      subject: "New Message Notification from lending book platform ",
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send(error.toString());
      } else {
        res.status(200).send("Email sent successfully");
      }
    });
  });
});
