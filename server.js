const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3001;
const cors = require("cors");
app.use(cors());

app.use(express.json()); // Middleware to parse JSON requests

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: "traibo-dev@outlook.com",
    pass: "ntWP2C1waCeENsoDBkRX",
  },
});

app.post("/send-email", (req, res) => {
  const { toEmail, subject, text } = req.body;

  const mailOptions = {
    from: "traibo-dev@outlook.com",
    to: toEmail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
