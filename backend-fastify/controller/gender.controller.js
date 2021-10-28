const Gender = require('../model/gender.model');
const errorController = require('./error.controller');

const fgetGenders = async () => {
  return new Promise((resolve, reject) => {
    Gender.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Genders'));
        }
      }
    }).lean();
  });
};

const finsertGender = async (data) => {
  return new Promise((resolve, reject) => {
    const newGender = new Gender(data);
    newGender.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteGender = async (id) => {
  return new Promise((resolve, reject) => {
    Gender.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateGender = async (id, data) => {
  return new Promise((resolve, reject) => {
    Gender.updateOne(
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
  getGenders: function (req, reply) {
    fgetGenders()
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
  insertGender: function (req, reply) {
    finsertGender(req.body)
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
  deleteGender: function (req, reply) {
    const gender_id = req.params.gender_id;

    if (!gender_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input gender id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteGender(gender_id)
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
  updateGender: function (req, reply) {
    const gender_id = req.params.gender_id;

    if (!gender_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input gender id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fupdateGender(gender_id, req.body)
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
