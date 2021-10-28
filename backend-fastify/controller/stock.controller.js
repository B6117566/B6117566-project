const Stock = require('../model/stock.model');
const errorController = require('./error.controller');

const fgetStocksByProductId = async (product_id) => {
  return new Promise((resolve, reject) => {
    Stock.find({ product_id: product_id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Stocks by Product id'));
        }
      }
    }).limit(6)
      .populate('size_id')
      .lean();
  });
};

const finsertStock = async (data) => {
  return new Promise((resolve, reject) => {
    const newStock = new Stock(data);
    newStock.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteStock = async (id) => {
  return new Promise((resolve, reject) => {
    Stock.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateStock = async (id, data) => {
  return new Promise((resolve, reject) => {
    Stock.updateOne(
      { _id: id },
      { $set: data },
      { runValidators: true },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('update successfully');
        }
      }
    );
  });
};
//------------------------------------------------------------------
module.exports = {
  getStocksByProductId: function (req, reply) {
    const product_id = req.params.product_id;

    if (!product_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input product id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fgetStocksByProductId(product_id)
      .then((resultStock) => {
        reply.code(200).send({
          sucessful: true,
          result: resultStock,
        });
      })
      .catch((err) => {
        reply.code(404).send({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  insertStock: function (req, reply) {
    finsertStock(req.body)
      .then((result) => {
        reply.code(201).send({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        if (errorController(err, req, reply)) {
          reply.code(400).send({
            sucessful: false,
            result: { messages: String(err) },
          });
        }
      });
  },
  deleteStock: function (req, reply) {
    const stock_id = req.params.stock_id;

    if (!stock_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input stock id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteStock(stock_id)
      .then((result) => {
        reply.code(200).send({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        reply.code(404).send({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  updateStockSomeField: function (req, reply) {
    const stock_id = req.params.stock_id;

    if (!stock_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input stock id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (length !== 1) {
      return reply.code(400).send({
        sucessful: false,
        result: {
          messages: 'data stock get only one field was not correct format',
        },
      });
    }
    //---------------------------------------------------------
    if (req.body.quantity || req.body.prices) {
      fupdateStock(stock_id, req.body)
        .then((result) => {
          reply.code(200).send({
            sucessful: true,
            result: result,
          });
        })
        .catch((err) => {
          if (errorController(err, req, reply)) {
            reply.code(404).send({
              sucessful: false,
              result: { messages: String(err) },
            });
          }
        });
    } else {
      return reply.code(400).send({
        sucessful: false,
        result: {
          messages: 'data stock was not correct format',
        },
      });
    }
  },
};
