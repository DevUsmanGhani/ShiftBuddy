const dotenv = require('/dotenv');
dotenv.config()

module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
}