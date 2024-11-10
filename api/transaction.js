
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/transaction", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.digiflazz.com/v1/transaction",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error processing transaction" });
  }
});

module.exports = app;
