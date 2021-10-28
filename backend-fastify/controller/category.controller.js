const Category = require('../model/category.model');
const mongoose = require('mongoose');
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
    Category.aggregate(
      [
        {
          $match: { gender_id: mongoose.Types.ObjectId(gender_id) },
        },
        {
          $group: {
            _id: '$class_id',
            category: { $push: { _id: '$_id', name: '$name' } },
          },
        },
        {
          $lookup: {
            from: 'Class',
            localField: '_id',
            foreignField: '_id',
            as: 'class',
          },
        },
        { $unwind: '$class' },
        { $project: { 'class._id': 0 } },
        { $sort: { 'category.name': -1 } },
      ],
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (data.length) {
            resolve(data);
          } else {
            reject(new Error('cannot find Categorys in Class By Gender id'));
          }
        }
      }
    );
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
  getCategorys: function (req, reply) {
    fgetCategorys()
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
  getCategorysByGenderId: function (req, reply) {
    const gender_id = req.params.gender_id;

    if (!gender_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input gender id was not correct format' },
      });
    }

    fgetCategorysByGenderId(gender_id)
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
  insertCategory: function (req, reply) {
    finsertCategory(req.body)
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
  deleteCategory: function (req, reply) {
    const category_id = req.params.category_id;

    if (!category_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input category id was not correct format' },
      });
    }

    fdeleteCategory(category_id)
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
  updateCategory: function (req, reply) {
    const category_id = req.params.category_id;

    if (!category_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input category id was not correct format' },
      });
    }

    fupdateCategory(category_id, req.body)
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
  },
  fgetCategorysOnlyIdByGenderId,
};
