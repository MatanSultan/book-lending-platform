const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { email, message } = req.body;

    const mailOptions = {
      from: functions.config().email.user,
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
