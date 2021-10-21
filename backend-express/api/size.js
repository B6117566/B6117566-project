const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/size.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router
  .route('/')
  .get(controller.getSizes)
  .post(authorization, accessControl, controller.insertSize);
router
  .route('/:size_id')
  .delete(authorization, accessControl, controller.deleteSize)
  .patch(authorization, accessControl, controller.updateSize);

module.exports = router;
