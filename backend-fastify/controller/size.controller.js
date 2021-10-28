const Size = require('../model/size.model');
const errorController = require('./error.controller');

const fgetSizes = async () => {
  return new Promise((resolve, reject) => {
    Size.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Sizes'));
        }
      }
    }).lean();
  });
};

const finsertSize = async (data) => {
  return new Promise((resolve, reject) => {
    const newSize = new Size(data);
    newSize.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteSize = async (id) => {
  return new Promise((resolve, reject) => {
    Size.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateSize = async (id, data) => {
  return new Promise((resolve, reject) => {
    Size.updateOne(
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
  getSizes: function (req, reply) {
    fgetSizes()
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
  insertSize: function (req, reply) {
    finsertSize(req.body)
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
  deleteSize: function (req, reply) {
    const size_id = req.params.size_id;

    if (!size_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input size id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteSize(size_id)
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
  updateSize: function (req, reply) {
    const size_id = req.params.size_id;

    if (!size_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input size id was not correct format' },
      });
    }

    const length = Object.keys(req.body).length;

    if (length !== 1) {
      return reply.code(400).send({
        sucessful: false,
        result: {
          messages: 'data size get only one field was not correct format',
        },
      });
    }
    //---------------------------------------------------------
    if (req.body.name || req.body.code) {
      fupdateSize(size_id, req.body)
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
          messages: 'data size was not correct format',
        },
      });
    }
  },
};
