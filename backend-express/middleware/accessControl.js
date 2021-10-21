const { ffindUserRoleById } = require('../controller/userrole.controller');
const accessControl = (req, res, next) => {
  if (!req.UserRole_ID || !req.URL_AUTOR) {
    return res.status(403).json({
      sucessful: false,
      result: { messages: 'Forbidden' },
    });
  }

  ffindUserRoleById(req.UserRole_ID)
    .then((result) => {
      let check = false;
      result.accessPart.map((item) => {
        if (item[0] === req.URL_AUTOR) {
          item[1].map((item2) => {
            if (item2 === req.method) {
              check = true;
            }
          });
        }
      });
      if (check) {
        next();
      } else {
        return res.status(403).json({
          sucessful: false,
          result: { messages: 'Forbidden' },
        });
      }
    })
    .catch(() => {
      return res.status(500).json({
        sucessful: false,
        result: { messages: 'Internal Server error' },
      });
    });
};

module.exports = accessControl;
