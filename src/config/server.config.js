const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT : process.env.PORT || 3000,
    NODE_ENV : process.env.NODE_ENV || "development",
    MONGODB_URI : process.env.MONGODB_URI,
    LOG_DB_URI : process.env.LOG_DB_URI
}