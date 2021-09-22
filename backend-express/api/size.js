const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/size.controller');

router
  .route('/')
  .get(controller.getSizes)
  .post(controller.insertSize);
router
  .route('/:size_id')
  .delete(controller.deleteSize)
  .put(controller.updateSizes)
  .patch(controller.updateSize);

module.exports = router;
