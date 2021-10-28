const Province = require('../model/province.model');
const errorController = require('./error.controller');

const fgetProvinces = async () => {
  return new Promise((resolve, reject) => {
    Province.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot get Provinces'));
        }
      }
    }).lean();
  });
};

const finsertProvince = async (data) => {
  return new Promise((resolve, reject) => {
    const newProvince = new Province(data);
    newProvince.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteProvince = async (id) => {
  return new Promise((resolve, reject) => {
    Province.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateProvince = async (id, data) => {
  return new Promise((resolve, reject) => {
    Province.updateOne(
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
  getProvinces: function (req, reply) {
    fgetProvinces()
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
  insertProvince: function (req, reply) {
    finsertProvince(req.body)
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
  deleteProvince: function (req, reply) {
    const province_id = req.params.province_id;

    if (!province_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input province id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fdeleteProvince(province_id)
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
  updateProvince: function (req, reply) {
    const province_id = req.params.province_id;

    if (!province_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input province id was not correct format' },
      });
    }
    //---------------------------------------------------------
    fupdateProvince(province_id, req.body)
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
