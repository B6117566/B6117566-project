const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/province.controller');

router
  .route('/')
  .get(controller.getProvinces)
  .post(controller.insertProvince);
router
  .route('/:province_id')
  .delete(controller.deleteProvince)
  .put(controller.updateProvince);

module.exports = router;
