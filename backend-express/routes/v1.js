const expressFunction = require("express");
const router = expressFunction.Router();

router.use("/usertypes", require("./api/usertype"));

module.exports = router;