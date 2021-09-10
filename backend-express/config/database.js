const mongoose = require('mongoose');

const url = `mongodb://${process.env.MONGO_DB_URL}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_SCHEMA}`;
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const database = (req, res, next) => {
  mongoose
    .connect(url, config)
    .then(() => {
      console.log('Connected to MongoDB....'); //warnning performance
      next();
    })
    .catch(() => {
      res.status(500).json({
        status: 500,
        message: 'Internal Server error',
      });
    });
};

module.exports = database;
