const Class = require('../model/class.model');

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
    Class.updateOne({ _id: id }, { $set: data }, (err) => {
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
  getClasses: function (req, res, next) {
    fgetClasses()
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
  insertClass: function (req, res, next) {
    finsertClass(req.body)
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
  deleteClass: function (req, res, next) {
    const class_id = req.params.class_id;

    if (!class_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input class id was not correct format',
      });
    }
    //---------------------------------------------------------
    fdeleteClass(class_id)
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
  updateClass: function (req, res, next) {
    const class_id = req.params.class_id;

    if (!class_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        sucessful: false,
        result: 'input class id was not correct format',
      });
    }
    //---------------------------------------------------------
    fupdateClass(class_id, req.body)
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