const Address = require('../model/address.model');

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
    Address.updateOne({ _id: id }, { $set: data }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('update successfully');
      }
    });
  });
};
//------------------------------------------------------------------
module.exports = {
  getAddressByProvinceId: function (req, res, next) {
    const province_id = req.params.province_id;

    if (!province_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input province id was not correct format',
      });
    }

    fgetAddressByProvinceId(province_id)
      .then((result) => {
        res.status(200).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
  insertAddress: function (req, res, next) {
    finsertAddress(req.body)
      .then((result) => {
        res.status(201).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
  deleteAddress: function (req, res, next) {
    const address_id = req.params.address_id;

    if (!address_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input address id was not correct format',
      });
    }

    fdeleteAddress(address_id)
      .then((result) => {
        res.status(200).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
  updateAddress: function (req, res, next) {
    const address_id = req.params.address_id;

    if (!address_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input address id was not correct format',
      });
    }

    fupdateAddress(address_id, req.body)
      .then((result) => {
        res.status(200).json({
          sucessful: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          sucessful: false,
          result: String(err),
        });
      });
  },
};
