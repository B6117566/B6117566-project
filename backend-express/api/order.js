const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/order.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');
const userAccess = require('../middleware/userAccess');

router
  .route('/')
  .get(authorization, accessControl, controller.getOrders)
  .post(authorization, accessControl, controller.insertOrder);
router
  .route('/user/:user_id')
  .get(authorization, accessControl, userAccess, controller.getOrdersByUserId);

module.exports = router;
