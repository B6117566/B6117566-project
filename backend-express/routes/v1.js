const expressFunction = require("express");
const router = expressFunction.Router();

router.use("/userroles", require("../api/userrole"));
router.use("/users", require("../api/user"));
router.use("/stocks", require("../api/stock"));
router.use("/sizes", require("../api/size"));
router.use("/provinces", require("../api/province"));
router.use("/products", require("../api/product"));
router.use("/orders", require("../api/order"));
router.use("/genders", require("../api/gender"));
router.use("/class", require("../api/class"));
router.use("/categorys", require("../api/category"));
router.use("/carts", require("../api/cart"));
router.use("/address", require("../api/address"));

module.exports = router;