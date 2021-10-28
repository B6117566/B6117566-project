const Order = require('../model/order.model');
const errorController = require('./error.controller');

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
              model: 'Size',
            },
          ],
        },
      })
      .lean();
  });
};

const fgetOrdersByUserId = async (user_id, limit, offset) => {
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
              model: 'Size',
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
  getOrders: function (req, reply) {
    let limit = 20;
    let offset = 0;

    if (req.query.limit) {
      if (req.query.limit.match(/^[0-9]+$/)) {
        limit = parseInt(req.query.limit);
      } else {
        return reply.code(400).send({
          sucessful: false,
          result: { messages: 'Limit was not correct format' },
        });
      }
    }
    if (req.query.offset) {
      if (req.query.offset.match(/^[0-9]+$/)) {
        offset = parseInt(req.query.offset);
      } else {
        return reply.code(400).send({
          sucessful: false,
          result: { messages: 'Offset was not correct format' },
        });
      }
    }
    //---------------------------------------------------------
    fgetOrders(limit, offset)
      .then((result) => {
        reply.code(200).send({
          sucessful: true,
          result: result,
          pagination: {
            count: limit,
            offset: offset,
          },
        });
      })
      .catch((err) => {
        reply.code(404).send({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  getOrdersByUserId: function (req, reply) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input user id was not correct format' },
      });
    }
    //---------------------------------------------------------
    let limit = 20;
    let offset = 0;

    if (req.query.limit) {
      if (req.query.limit.match(/^[0-9]+$/)) {
        limit = parseInt(req.query.limit);
      } else {
        return reply.code(400).send({
          sucessful: false,
          result: { messages: 'Limit was not correct format' },
        });
      }
    }
    if (req.query.offset) {
      if (req.query.offset.match(/^[0-9]+$/)) {
        offset = parseInt(req.query.offset);
      } else {
        return reply.code(400).send({
          sucessful: false,
          result: { messages: 'Offset was not correct format' },
        });
      }
    }
    //---------------------------------------------------------
    fgetOrdersByUserId(user_id, limit, offset)
      .then((resultOrder) => {
        reply.code(200).send({
          sucessful: true,
          result: resultOrder,
          pagination: {
            count: limit,
            offset: offset,
          },
        });
      })
      .catch((err) => {
        reply.code(404).send({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  insertOrder: function (req, reply) {
    finsertOrder(req.body)
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
};
