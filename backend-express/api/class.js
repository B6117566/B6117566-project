const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/class.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

router
  .route('/')
  .get(controller.getClasses)
  .post(authorization, accessControl, controller.insertClass);
router
  .route('/:class_id')
  .delete(authorization, accessControl, controller.deleteClass)
  .put(authorization, accessControl, controller.updateClass);

module.exports = router;
