const Product = require('../model/product.model');
const { fgetCategorysOnlyIdByGenderId } = require('./category.controller');
const errorController = require('./error.controller');

const fgetProductsByMultiCategoryId = async (category_id, limit, offset) => {
  return new Promise((resolve, reject) => {
    Product.find({ category_id: { $in: category_id } }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Products by multi Category id'));
        }
      }
    })
      .limit(limit)
      .skip(offset)
      .populate('category_id', 'name')
      .lean();
  });
};

const fgetProductsByCategoryId = async (category_id, limit, offset) => {
  return new Promise((resolve, reject) => {
    Product.find({ category_id: category_id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Products by Category id'));
        }
      }
    })
      .limit(limit)
      .skip(offset)
      .lean();
  });
};

const ffindProducts = async (name, limit, offset) => {
  return new Promise((resolve, reject) => {
    Product.find({ name: { $regex: name } }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Products'));
        }
      }
    })
      .limit(limit)
      .skip(offset)
      .populate({
        path: 'category_id',
        model: 'Category',
        populate: {
          path: 'gender_id',
          model: 'Gender',
        },
      })
      .lean();
  });
};

const ffindProductById = async (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('cannot find Product by id'));
        }
      }
    }).lean();
  });
};

const finsertProduct = async (data) => {
  return new Promise((resolve, reject) => {
    const newProduct = new Product(data);
    newProduct.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteProduct = async (id) => {
  return new Promise((resolve, reject) => {
    Product.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateProduct = async (id, data) => {
  return new Promise((resolve, reject) => {
    Product.updateOne(
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
  getProductsAllByGender: function (req, res, next) {
    const gender_id = req.params.gender_id;

    if (!gender_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input gender id was not correct format' },
      });
    }
    //---------------------------------------------------------
    let limit = 20;
    let offset = 0;

    if (req.query.limit) {
      if (req.query.limit.match(/^[0-9]+$/)) {
        limit = parseInt(req.query.limit);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: { messages: 'Limit was not correct format' },
        });
      }
    }
    if (req.query.offset) {
      if (req.query.offset.match(/^[0-9]+$/)) {
        offset = parseInt(req.query.offset);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: { messages: 'Offset was not correct format' },
        });
      }
    }
    //---------------------------------------------------------
    fgetCategorysOnlyIdByGenderId(gender_id)
      .then((resultCategory) => {
        fgetProductsByMultiCategoryId(resultCategory, limit, offset)
          .then((resultProduct) => {
            res.status(200).json({
              sucessful: true,
              result: resultProduct,
              pagination: {
                count: limit,
                offset: offset,
              },
            });
          })
          .catch((err) => {
            res.status(404).json({
              sucessful: false,
              result: { messages: String(err) },
            });
          });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  getProductsAllByCategoryGender: function (req, res, next) {
    const category_id = req.params.category_id;

    if (!category_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input category id was not correct format' },
      });
    }
    //---------------------------------------------------------
    let limit = 20;
    let offset = 0;

    if (req.query.limit) {
      if (req.query.limit.match(/^[0-9]+$/)) {
        limit = parseInt(req.query.limit);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: { messages: 'Limit was not correct format' },
        });
      }
    }
    if (req.query.offset) {
      if (req.query.offset.match(/^[0-9]+$/)) {
        offset = parseInt(req.query.offset);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: { messages: 'Offset was not correct format' },
        });
      }
    }
    //---------------------------------------------------------
    fgetProductsByCategoryId(category_id, limit, offset)
      .then((resultProduct) => {
        res.status(200).json({
          sucessful: true,
          result: resultProduct,
          pagination: {
            count: limit,
            offset: offset,
          },
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  findProducts: function (req, res, next) {
    const s_product = req.params.s_product;

    if (!s_product.match(/^[A-Za-z\s]+$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input search product was not correct format' },
      });
    }
    //---------------------------------------------------------
    let limit = 20;
    let offset = 0;

    if (req.query.limit) {
      if (req.query.limit.match(/^[0-9]+$/)) {
        limit = parseInt(req.query.limit);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: { messages: 'Limit was not correct format' },
        });
      }
    }
    if (req.query.offset) {
      if (req.query.offset.match(/^[0-9]+$/)) {
        offset = parseInt(req.query.offset);
      } else {
        return res.status(400).json({
          sucessful: false,
          result: { messages: 'Offset was not correct format' },
        });
      }
    }
    //---------------------------------------------------------
    ffindProducts(s_product, limit, offset)
      .then((resultProduct) => {
        res.status(200).json({
          sucessful: true,
          result: resultProduct,
          pagination: {
            count: limit,
            offset: offset,
          },
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  findProductById: function (req, res, next) {
    const product_id = req.params.product_id;

    if (!product_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input product id was not correct format' },
      });
    }
    //---------------------------------------------------------
    ffindProductById(product_id)
      .then((resultProduct) => {
        res.status(200).json({
          sucessful: true,
          result: resultProduct,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  insertProduct: function (req, res, next) {
    finsertProduct(req.body)
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
  deleteProduct: function (req, res, next) {
    const product_id = req.params.product_id;

    if (!product_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input product id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteProduct(product_id)
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
  updateProductSomeField: function (req, res, next) {
    const product_id = req.params.product_id;

    if (!product_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input product id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (length >= 1 && length <= 2) {
      return res.status(400).json({
        sucessful: false,
        result: {
          messages: 'data product get only one or two field was not correct format',
        },
      });
    }
    //---------------------------------------------------------
    if (
      req.body.code ||
      req.body.name ||
      req.body.prices ||
      req.body.shortDescription ||
      req.body.longDescription ||
      req.body.composition ||
      req.body.washingInformation ||
      (req.body.file && req.body.img) ||
      req.body.isSale
    ) {
      fupdateProduct(product_id, req.body)
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
          messages: 'data product was not correct format',
        },
      });
    }
  },
};
