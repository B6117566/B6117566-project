const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const key = process.env.JWT_SECRETKEY;

const User = require('../model/user.model');
const errorController = require('./error.controller');

//------------------------------------------------------------------
const compareHash = async (plainText, hashText) => {
  return new Promise((reslove, reject) => {
    bcrypt.compare(plainText, hashText, (err, data) => {
      if (err) {
        reject(new Error('Error bcrypt compare'));
      } else {
        reslove(data);
      }
    });
  });
};
//------------------------------------------------------------------
const ffindUsers = async (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('cannot get Users by email'));
        }
      }
    })
      .select('_id password firstname lastname')
      .populate('userRole_id', 'role')
      .lean();
  });
};

const ffindUserById = async (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('cannot find User by id'));
        }
      }
    })
      .select('-userRole_id')
      .populate({
        path: 'address_id',
        model: 'Address',
        populate: {
          path: 'province_id',
          model: 'Province',
        },
      })
      .lean();
  });
};

const finsertUser = async (data) => {
  return new Promise((resolve, reject) => {
    const newUser = new User(data);
    newUser.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Signup successfully');
      }
    });
  });
};

const fdeleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateUser = async (id, data) => {
  return new Promise((resolve, reject) => {
    User.updateOne(
      { _id: id },
      [{ $set: data }, { $unset: userRole_id }],
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
  signinUser: async function (req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };

    if (!validator.isEmail(payload.email)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input email was not correct format' },
      });
    }
    if (!validator.isAlphanumeric(payload.password)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input password was not correct format' },
      });
    }
    //---------------------------------------------------------
    try {
      const resultUser = await ffindUsers(payload.email);
      const loginStatus = await compareHash(
        payload.password,
        resultUser.password
      );
      const resultSend = {
        _id: resultUser._id,
        firstname: resultUser.firstname,
        lastname: resultUser.lastname,
        userRole: resultUser.userRole_id,
      };

      if (loginStatus) {
        const token = jwt.sign(resultSend, key, { expiresIn: 60 * 60 });
        res.status(200).json({
          sucessful: true,
          result: { ...resultSend, token },
        });
      } else {
        res.status(401).json({
          sucessful: false,
        });
      }
    } catch (error) {
      res.status(400).json({
        sucessful: false,
        result: String(error),
      });
    }
  },
  findUserById: function (req, res, next) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input user id was not correct format' },
      });
    }
    //---------------------------------------------------------
    ffindUserById(user_id)
      .then((resultUser) => {
        res.status(200).json({
          sucessful: true,
          result: resultUser,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  signupUser: function (req, res, next) {
    const payload = new User(req.body);

    finsertUser(payload)
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
  deleteUser: function (req, res, next) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input user id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteUser(user_id)
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
  updateUserSomeField: function (req, res, next) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input user id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (length >= 1 && length <= 2) {
      return res.status(400).json({
        sucessful: false,
        result: {
          messages:
            'data user get only one or two field was not correct format',
        },
      });
    }
    //---------------------------------------------------------
    if (
      req.body.password ||
      req.body.firstname ||
      req.body.lastname ||
      req.body.phone ||
      req.body.addressDetail ||
      req.body.address_id
    ) {
      fupdateUser(user_id, req.body)
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
          messages: 'data user was not correct format',
        },
      });
    }
  },
};
