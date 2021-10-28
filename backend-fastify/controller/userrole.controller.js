const UserRole = require('../model/userrole.model');
const errorController = require('./error.controller');

const fgetUserRoles = async () => {
  return new Promise((resolve, reject) => {
    UserRole.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get UserRoles'));
        }
      }
    }).lean();
  });
};

const fgetUserRoleOfUser = async () => {
  return new Promise((resolve, reject) => {
    UserRole.findOne((err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('cannot find UserRoleOfUser'));
        }
      }
    }).lean();
  });
};

const ffindUserRoleById = async (id) => {
  return new Promise((resolve, reject) => {
    UserRole.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('cannot find UserRole by id'));
        }
      }
    }).lean();
  });
};

const fnfindUserRoleById = async (id) => {
  return new Promise((resolve, reject) => {
    UserRole.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('cannot find UserRole by id'));
        }
      }
    })
      .select('-accessPart')
      .lean();
  });
};

const finsertUserRole = async (data) => {
  return new Promise((resolve, reject) => {
    const newUserRole = new UserRole(data);
    newUserRole.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteUserRole = async (id) => {
  return new Promise((resolve, reject) => {
    UserRole.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateUserRole = async (id, data) => {
  return new Promise((resolve, reject) => {
    UserRole.updateOne(
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
  getUserRoles: function (req, reply) {
    fgetUserRoles()
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
  getUserRoleOfUser: function (req, reply) {
    fgetUserRoleOfUser()
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
  findUserRoleById: function (req, reply) {
    const userRole_id = req.body.userRole_id;

    if (!userRole_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input userRole id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fnfindUserRoleById(userRole_id)
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
  insertUserRole: function (req, reply) {
    finsertUserRole(req.body)
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
  deleteUserRole: function (req, reply) {
    const userRole_id = req.params.userRole_id;

    if (!userRole_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input userRole id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteUserRole(userRole_id)
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
  updateUserRole: function (req, reply) {
    const userRole_id = req.params.userRole_id;

    if (!userRole_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input userRole id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (length !== 1) {
      return reply.code(400).send({
        sucessful: false,
        result: {
          messages: 'data userRole get only one field was not correct format',
        },
      });
    }
    //---------------------------------------------------------
    if (req.body.authorizationPart) {
      fupdateUserRole(userRole_id, req.body)
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
          messages: 'data userRole was not correct format',
        },
      });
    }
  },
  ffindUserRoleById,
};
