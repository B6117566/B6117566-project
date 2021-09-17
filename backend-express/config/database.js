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
      console.log('Cant Connected to MongoDB....');
      res.status(500).json({
        sucessful: false,
        result: 'Internal Server error',
      });
    });
};

module.exports = database;
