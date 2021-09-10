const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRETKEY

const authorization = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token === undefined) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  } else {
    jwt.verify(token, key, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      } else {

        //ถ้ามีเวลาทำ ตรวจคำขอมาจาก customer หรือไม่
        console.log("AUTHER", decode);
        console.log(req.baseUrl);
        console.log(req.method);

        next();
      }
    });
  }
};

module.exports = authorization;
