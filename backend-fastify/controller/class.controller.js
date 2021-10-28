const Class = require('../model/class.model');
const errorController = require('./error.controller');

const fgetClasses = async () => {
  return new Promise((resolve, reject) => {
    Class.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Classes'));
        }
      }
    }).lean();
  });
};

const finsertClass = async (data) => {
  return new Promise((resolve, reject) => {
    const newClass = new Class(data);
    newClass.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteClass = async (id) => {
  return new Promise((resolve, reject) => {
    Class.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateClass = async (id, data) => {
  return new Promise((resolve, reject) => {
    Class.updateOne(
      { _id: id },
      { $set: { name: data } },
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
  getClasses: function (req, reply) {
    fgetClasses()
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
  insertClass: function (req, reply) {
    finsertClass(req.body)
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
  deleteClass: function (req, reply) {
    const class_id = req.params.class_id;

    if (!class_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input class id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteClass(class_id)
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
  updateClass: function (req, reply) {
    const class_id = req.params.class_id;

    if (!class_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input class id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fupdateClass(class_id, req.body)
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
};
