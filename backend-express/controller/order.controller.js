const Order = require('../model/order.model');

const fgetOrders = async (limit, offset) => {
  return new Promise((resolve, reject) => {
    Order.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Orders'));
        }
      }
    })
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'cart_id',
        model: 'Cart',
        populate: {
          path: 'stock_id',
          model: 'Stock',
          populate: [
            {
              path: 'product_id',
              model: 'Product',
            },
            {
              path: 'size_id',
              model: 'Order',
            },
          ],
        },
      })
      .lean();
  });
};

const fgetOrdersByUserId = async (user_id) => {
  return new Promise((resolve, reject) => {
    Order.find({ user_id: user_id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Orders by User id'));
        }
      }
    })
      .populate({
        path: 'cart_id',
        model: 'Cart',
        populate: {
          path: 'stock_id',
          model: 'Stock',
          populate: [
            {
              path: 'product_id',
              model: 'Product',
            },
            {
              path: 'size_id',
              model: 'Order',
            },
          ],
        },
      })
      .lean();
  });
};

const finsertOrder = async (data) => {
  return new Promise((resolve, reject) => {
    const newOrder = new Order(data);
    newOrder.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

//------------------------------------------------------------------
module.exports = {
  getOrders: function (req, res, next) {
    let limit = 20;
    let offset = 0;

    if (req.query.limit) {
      if (req.query.limit.match(/^[0-9]+$/)) {
        limit = parseInt(req.query.limit);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: 'Limit was not correct format',
        });
      }
    }
    if (req.query.offset) {
      if (req.query.offset.match(/^[0-9]+$/)) {
        offset = parseInt(req.query.offset);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: 'Offset was not correct format',
        });
      }
    }
    //---------------------------------------------------------
    fgetOrders(limit, offset)
      .then((result) => {
        res.status(200).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
  getOrdersByUserId: function (req, res, next) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input user id was not correct format',
      });
    }
    //---------------------------------------------------------
    fgetOrdersByUserId(user_id)
      .then((resultOrder) => {
        res.status(200).json({
          sucessful: true,
          result: resultOrder,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
  insertOrder: function (req, res, next) {
    finsertOrder(req.body)
      .then((result) => {
        res.status(201).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
};
