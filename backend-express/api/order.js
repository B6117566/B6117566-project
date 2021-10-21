const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/order.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router
  .route('/')
  .get(authorization, accessControl, controller.getOrders)
  .post(authorization, accessControl, controller.insertOrder);
router
  .route('/user/:user_id')
  .get(authorization, accessControl, controller.getOrdersByUserId);

module.exports = router;
