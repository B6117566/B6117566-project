const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/stock.controller');

router.route('/')
  .post(controller.insertStock);
router.route('/:stock_id')
  .delete(controller.deleteStock)
  .patch(controller.updateStockSomeField);
router.route('/product/:product_id')
  .get(controller.getStocksByProductId);

module.exports = router;
