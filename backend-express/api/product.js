const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/product.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router.route('/').post(authorization, accessControl, controller.insertProduct);
router
  .route('/:product_id')
  .get(controller.findProductById)
  .delete(authorization, accessControl, controller.deleteProduct)
  .patch(authorization, accessControl, controller.updateProductSomeField);
router.route('/gender/:gender_id').get(controller.getProductsAllByGender);
router
  .route('/category/:category_id')
  .get(controller.getProductsAllByCategoryGender);
router.route('/search/:s_product').get(controller.findProducts);

module.exports = router;
