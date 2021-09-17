const expressFunction = require("express");
const router = expressFunction.Router();
const controller = require('../controller/cart.controller')

router.route('/')
  .post(controller.insertCart);
router.route('/:cart_id')
  .delete(controller.deleteCart)
  .patch(controller.updateCartSomeField);
router.route('/user/:user_id')
  .get(controller.getCartsByUserId);

module.exports = router;