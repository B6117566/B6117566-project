const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/product.controller');

router.route('/')
  .post(controller.insertProduct);
router.route('/:product_id')
  .get(controller.findProductById)
  .delete(controller.deleteProduct)
  .patch(controller.updateProductSomeField);
router.route('/gender/:gender_id')
  .get(controller.getProductsAllByGender);
router.route('/category/:category_id')
  .get(controller.getProductsAllByCategoryGender);
router.route('/search/:s_product')
  .get(controller.findProducts);

module.exports = router;
