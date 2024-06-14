const axios = require("axios");
const https = require("https");

exports.handler = async (event) => {
  const { userId, password, url } = JSON.parse(event.body);

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

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
