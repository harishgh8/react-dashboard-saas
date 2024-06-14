const express = require("express");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 5004;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/api/data", async (req, res) => {
  const { userId, password, url } = req.body;

  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
      },
      auth: {
        username: userId,
        password: password,
      },
      httpsAgent: agent,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
