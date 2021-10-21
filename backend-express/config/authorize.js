const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRETKEY;

const authorization = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      sucessful: false,
      result: { messages: 'Unauthorized' },
    });
  } else {
    jwt.verify(token, key, (err, decode) => {
      if (err) {
        return res.status(401).json({
          sucessful: false,
          result: { messages: 'Unauthorized' },
        });
      } else {
        req.UserRole_ID = decode.userRole._id;
        req.URL_AUTOR = '/' + req.baseUrl.split('/')[3];
        next();
      }
    });
  }
};

module.exports = authorization;
