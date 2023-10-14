const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const outlookEmail = functions.config().outlook.email;
const outlookPassword = functions.config().outlook.password;

const mailTransport = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: outlookEmail,
    pass: outlookPassword,
  },
});

exports.sendEmail = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, message } = req.body;

  const mailOptions = {
    from: outlookEmail,
    to: email,
    subject: "Book Request",
    text: message,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});
