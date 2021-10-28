const Address = require('../model/address.model');
const errorController = require('./error.controller');

const fgetAddressByProvinceId = async (province_id) => {
  return new Promise((resolve, reject) => {
    Address.find({ province_id: province_id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length) {
          resolve(data);
        } else {
          reject(new Error('cannot find Address by Province id'));
        }
      }
    }).lean();
  });
};

const finsertAddress = async (data) => {
  return new Promise((resolve, reject) => {
    const newAddress = new Address(data);
    newAddress.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('added successfully');
      }
    });
  });
};

const fdeleteAddress = async (id) => {
  return new Promise((resolve, reject) => {
    Address.deleteOne({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('delete successfully');
      }
    });
  });
};

const fupdateAddress = async (id, data) => {
  return new Promise((resolve, reject) => {
    Address.updateOne(
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
  getAddressByProvinceId: function (req, reply) {
    const province_id = req.params.province_id;

    if (!province_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input province id was not correct format' },
      });
    }

    fgetAddressByProvinceId(province_id)
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
  insertAddress: function (req, reply) {
    finsertAddress(req.body)
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
  deleteAddress: function (req, reply) {
    const address_id = req.params.address_id;

    if (!address_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input address id was not correct format' },
      });
    }

    fdeleteAddress(address_id)
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
  updateAddress: function (req, reply) {
    const address_id = req.params.address_id;

    if (!address_id.match(/^[0-9a-fA-F]{24}$/)) {
      return reply.code(400).send({
        sucessful: false,
        result: { messages: 'input address id was not correct format' },
      });
    }

    fupdateAddress(address_id, req.body)
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
