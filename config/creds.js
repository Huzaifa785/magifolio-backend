// configure dotenv
require('dotenv').config();

module.exports = {
  mongoURI: `mongodb+srv://huzaifa:${process.env.MONGODB_PASSWORD}@portfolio-cluster.fip9yg7.mongodb.net/users`,
  secretOrKey: "secret"
};