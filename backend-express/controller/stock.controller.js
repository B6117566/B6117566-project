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
    })
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
  getStocksByProductId: function (req, res, next) {
    const product_id = req.params.product_id;

    if (!product_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input product id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fgetStocksByProductId(product_id)
      .then((resultStock) => {
        res.status(200).json({
          sucessful: true,
          result: resultStock,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  insertStock: function (req, res, next) {
    finsertStock(req.body)
      .then((result) => {
        res.status(201).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        if (errorController(err, req, res)) {
          res.status(400).json({
            sucessful: false,
            result: { messages: String(err) },
          });
        }
      });
  },
  deleteStock: function (req, res, next) {
    const stock_id = req.params.stock_id;

    if (!stock_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input stock id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteStock(stock_id)
      .then((result) => {
        res.status(200).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  updateStockSomeField: function (req, res, next) {
    const stock_id = req.params.stock_id;

    if (!stock_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input stock id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (length !== 1) {
      return res.status(400).json({
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
          res.status(200).json({
            sucessful: true,
            result: result,
          });
        })
        .catch((err) => {
          if (errorController(err, req, res)) {
            res.status(404).json({
              sucessful: false,
              result: { messages: String(err) },
            });
          }
        });
    } else {
      return res.status(400).json({
        sucessful: false,
        result: {
          messages: 'data stock was not correct format',
        },
      });
    }
  },
};
