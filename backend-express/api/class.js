const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/class.controller');

router
  .route('/')
  .get(controller.getClasses)
  .post(controller.insertClass);
router
  .route('/:class_id')
  .delete(controller.deleteClass)
  .put(controller.updateClass);

module.exports = router;
