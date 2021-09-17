const expressFunction = require("express");
const router = expressFunction.Router();

router.use("/userrole", require("../api/userrole"));
router.use("/user", require("../api/user"));
router.use("/stock", require("../api/stock"));
router.use("/size", require("../api/size"));
router.use("/province", require("../api/province"));
router.use("/product", require("../api/product"));
router.use("/order", require("../api/order"));
router.use("/gender", require("../api/gender"));
router.use("/class", require("../api/class"));
router.use("/category", require("../api/category"));
router.use("/cart", require("../api/cart"));
router.use("/address", require("../api/address"));

module.exports = router;