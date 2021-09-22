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
const ffindUserRole = async (data) => {
  return new Promise((resolve, reject) => {
    UserRole.findOne({ role: { $regex: data } }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('cannot find UserRole'));
        }
      }
    })
      .select('_id')
      .lean();
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

//------------------------------------------------------------------
module.exports = {
  getUserRoles: function (req, res, next) {
    fgetUserRoles()
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
  insertUserRole: function (req, res, next) {
    finsertUserRole(req.body)
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
  deleteUserRole: function (req, res, next) {
    const userrole_id = req.params.userrole_id;

    if (!userrole_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input userrole id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteUserRole(userrole_id)
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
  updateUserRole: function (req, res, next) {
    const userrole_id = req.params.userrole_id;

    if (!userrole_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: { messages: 'input userrole id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (length !== 1) {
      return res.status(400).json({
        sucessful: false,
        result: {
          messages: 'data userrole get only one field was not correct format',
        },
      });
    }
    //---------------------------------------------------------
    if (req.body.authorizationPart) {
      fupdateUserRole(userrole_id, req.body)
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
          messages: 'data userrole was not correct format',
        },
      });
    }
  },
  ffindUserRole,
  ffindUserRoleById,
};