require('dotenv').config();

export default {
  "port": process.env.PORT,
  "mongoUrl": process.env.MONGO_URL,
  "bodyLimit": "100kb"
};
