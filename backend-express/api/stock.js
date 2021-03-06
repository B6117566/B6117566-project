const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/stock.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

router.route('/').post(authorization, accessControl, controller.insertStock);
router
  .route('/:stock_id')
  .delete(authorization, accessControl, controller.deleteStock)
  .patch(authorization, accessControl, controller.updateStockSomeField);
router.route('/product/:product_id').get(controller.getStocksByProductId);

module.exports = router;
