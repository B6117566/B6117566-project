const Category = require('../model/category.model');
const errorController = require('./error.controller');

const fgetCategorys = async () => {
  return new Promise((resolve, reject) => {
    Category.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Categorys'));
        }
      }
    })
      .populate('class_id')
      .populate('gender_id')
      .lean();
  });
};

const fgetCategorysByGenderId = async (gender_id) => {
  return new Promise((resolve, reject) => {
    Category.find({ gender_id: gender_id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot find Categorys By Gender id'));
        }
      }
    }).lean();
  });
};

const finsertCategory = async (data) => {
  return new Promise((resolve, reject) => {
    const newCategory = new Category(data);
    newCategory.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteCategory = async (id) => {
  return new Promise((resolve, reject) => {
    Category.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateCategory = async (id, data) => {
  return new Promise((resolve, reject) => {
    Category.updateOne(
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
const fgetCategorysOnlyIdByGenderId = async (gender_id) => {
  return new Promise((resolve, reject) => {
    Category.find({ gender_id: gender_id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot find Categorys list by Gender id'));
        }
      }
    })
      .select('_id')
      .lean();
  });
};

//------------------------------------------------------------------
module.exports = {
  getCategorys: function (req, res, next) {
    fgetCategorys()
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
  getCategorysByGenderId: function (req, res, next) {
    const gender_id = req.params.gender_id;

    if (!gender_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input gender id was not correct format' },
      });
    }

    fgetCategorysByGenderId(gender_id)
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
  insertCategory: function (req, res, next) {
    finsertCategory(req.body)
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
  deleteCategory: function (req, res, next) {
    const category_id = req.params.category_id;

    if (!category_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input category id was not correct format' },
      });
    }

    fdeleteCategory(category_id)
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
  updateCategory: function (req, res, next) {
    const category_id = req.params.category_id;

    if (!category_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input category id was not correct format' },
      });
    }

    fupdateCategory(category_id, req.body)
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
  },
  fgetCategorysOnlyIdByGenderId,
};
