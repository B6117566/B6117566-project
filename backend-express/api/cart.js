const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/cart.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');
const userAccess = require('../middleware/userAccess');

router.route('/').post(authorization, accessControl, controller.insertCart);
router
  .route('/:cart_id')
  .delete(authorization, accessControl, controller.deleteCart)
  .patch(authorization, accessControl, controller.updateCartSomeField);
router
  .route('/user/:user_id')
  .get(authorization, accessControl, userAccess, controller.getCartsByUserId);

module.exports = router;
