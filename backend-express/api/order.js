const expressFunction = require("express");
const router = expressFunction.Router();
const controller = require('../controller/order.controller')

router.route('/')
  .get(controller.getOrders)
  .post(controller.insertOrder);
router.route('/user/:user_id')
  .get(controller.getOrdersByUserId);

module.exports = router;