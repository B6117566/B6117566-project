const Province = require('../model/province.model');

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
    Province.updateOne({ _id: id }, { $set: data }, (err) => {
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
  getProvinces: function (req, res, next) {
    fgetProvinces()
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
  insertProvince: function (req, res, next) {
    finsertProvince(req.body)
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
  deleteProvince: function (req, res, next) {
    const province_id = req.params.province_id;

    if (!province_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input province id was not correct format',
      });
    }
    //---------------------------------------------------------
    fdeleteProvince(province_id)
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
  updateProvince: function (req, res, next) {
    const province_id = req.params.province_id;

    if (!province_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input province id was not correct format',
      });
    }
    //---------------------------------------------------------
    fupdateProvince(province_id, req.body)
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
