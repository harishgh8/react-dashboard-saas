const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

const algorithm = "aes-256-cbc";
const secretKey = Buffer.from(process.env.SECRET_KEY, "base64");

const ivLength = 16;

const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
};

const configSchema = new mongoose.Schema({
  configName: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    set: encrypt,
    get: decrypt,
  },
  password: {
    type: String,
    required: true,
    set: encrypt,
    get: decrypt,
  },
  url: {
    type: String,
    required: true,
    set: encrypt,
    get: decrypt,
  },
});

configSchema.set("toJSON", { getters: true });
configSchema.set("toObject", { getters: true });

module.exports = mongoose.model("Config", configSchema);
