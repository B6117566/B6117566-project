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
      .select('-userRole_id -password')
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
  signinUser: async function (req, reply) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };

    if (!validator.isEmail(payload.email)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input email was not correct format' },
      });
    }
    if (!validator.isAlphanumeric(payload.password)) {
      return reply.code(400).send({
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
        const token = jwt.sign(resultSend, key, { expiresIn: '3h' });
        reply.code(200).send({
          sucessful: true,
          result: { ...resultSend, token },
        });
      } else {
        reply.code(401).send({
          sucessful: false,
        });
      }
    } catch (error) {
      reply.code(400).send({
        sucessful: false,
        result: String(error),
      });
    }
  },
  findUserById: function (req, reply) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input user id was not correct format' },
      });
    }
    //---------------------------------------------------------
    ffindUserById(user_id)
      .then((resultUser) => {
        reply.code(200).send({
          sucessful: true,
          result: resultUser,
        });
      })
      .catch((err) => {
        reply.code(404).send({
          sucessful: false,
          result: { messages: String(err) },
        });
      });
  },
  signupUser: function (req, reply) {
    const payload = new User(req.body);

    finsertUser(payload)
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
  deleteUser: function (req, reply) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input user id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteUser(user_id)
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
  updateUserSomeField: function (req, reply) {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input user id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (!(length >= 1 && length <= 5)) {
      return reply.code(400).send({
        sucessful: false,
        result: {
          messages:
            'data user get only 1 or max 5 field was not correct format',
        },
      });
    }
    //---------------------------------------------------------
    if (
      req.body.firstname ||
      req.body.lastname ||
      req.body.phone ||
      req.body.addressDetail ||
      req.body.address_id
    ) {
      fupdateUser(user_id, req.body)
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
          messages: 'data user was not correct format',
        },
      });
    }
  },
};
