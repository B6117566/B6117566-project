const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/cart.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router.route('/').post(authorization, accessControl, controller.insertCart);
router
  .route('/:cart_id')
  .delete(authorization, accessControl, controller.deleteCart)
  .patch(authorization, accessControl, controller.updateCartSomeField);
router
  .route('/user/:user_id')
  .get(authorization, accessControl, controller.getCartsByUserId);

module.exports = router;
