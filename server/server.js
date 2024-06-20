const express = require("express");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Config = require("./models/config");
require("dotenv").config();

const app = express();
const port = 5006;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

mongoose.connect(
  "mongodb+srv://harishghiriyur:ylqIVPfCIwxU1jLL@cluster0.tcxxrru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
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

app.post("/api/config", async (req, res) => {
  const { configName, userId, password, url } = req.body;
  try {
    const config = new Config({ configName, userId, password, url });
    await config.save();
    res.status(201).send(config);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/api/configNames", async (req, res) => {
  try {
    const configs = await Config.find({}, "configName");
    res.json(configs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/config/:configName", async (req, res) => {
  const { configName } = req.params;
  try {
    const config = await Config.findOne({ configName });
    if (!config) {
      return res.status(404).send({ error: "Config not found" });
    }
    res.send(config);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/api/configs", async (req, res) => {
  try {
    const configs = await Config.find().select("configName -_id");
    res.json(configs);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
