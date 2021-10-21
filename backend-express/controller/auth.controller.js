const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRETKEY;

//------------------------------------------------------------------
module.exports = {
  checkExpiresAuthorization: function (req, res, next) {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        sucessful: false,
        result: { messages: 'Unauthorized' },
      });
    } else {
      jwt.verify(token, key, (err) => {
        if (err) {
          return res.status(401).json({
            sucessful: false,
            result: { messages: 'Unauthorized' },
          });
        } else {
          return res.status(200).json({
            sucessful: true,
          });
        }
      });
    }
  },
};
