const Cart = require('../model/cart.model');

const fgetCartsByUserId = async (user_id) => {
  return new Promise((resolve, reject) => {
    Cart.find({ user_id: user_id, isCart: true }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Carts by User id'));
        }
      }
    })
      .populate({
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
      })
      .lean();
  });
};

const finsertCart = async (data) => {
  return new Promise((resolve, reject) => {
    const newCart = new Cart(data);
    newCart.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteCart = async (id) => {
  return new Promise((resolve, reject) => {
    Cart.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateCart = async (id, data) => {
  return new Promise((resolve, reject) => {
    Cart.updateOne({ _id: id }, { $set: data }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('update successfully');
      }
    });
  });
};
//------------------------------------------------------------------
module.exports = {
  getCartsByUserId: function (req, res, next) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input user id was not correct format',
      });
    }
    //---------------------------------------------------------
    fgetCartsByUserId(user_id)
      .then((resultCart) => {
        res.status(200).json({
          sucessful: true,
          result: resultCart,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
  insertCart: function (req, res, next) {
    finsertCart(req.body)
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
  deleteCart: function (req, res, next) {
    const cart_id = req.params.cart_id;

    if (!cart_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input cart id was not correct format',
      });
    }
    //---------------------------------------------------------
    fdeleteCart(cart_id)
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
  updateCartSomeField: function (req, res, next) {
    const cart_id = req.params.cart_id;

    if (!cart_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input cart id was not correct format',
      });
    }
    //---------------------------------------------------------
    fupdateCart(cart_id, req.body)
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
};
