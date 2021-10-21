const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/province.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router
  .route('/')
  .get(controller.getProvinces)
  .post(authorization, accessControl, controller.insertProvince);
router
  .route('/:province_id')
  .delete(authorization, accessControl, controller.deleteProvince)
  .put(authorization, accessControl, controller.updateProvince);

module.exports = router;
