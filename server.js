const express = require("express");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post("/webhook", (req, res) => {
  const MessagingResponse = twilio.twiml.MessagingResponse;
  const twiml = new MessagingResponse();

  const incoming = req.body.Body ? req.body.Body.toLowerCase() : "";

  if (incoming.includes("hello")) {
    twiml.message("Hi! 👋 How can I help you today?");
  } else {
    twiml.message("Welcome! 😊 Please tell me what you need.");
  }

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot running on port " + PORT));
