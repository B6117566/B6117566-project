const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/category.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router
  .route('/')
  .get(controller.getCategorys)
  .post(authorization, accessControl, controller.insertCategory);
router
  .route('/:category_id')
  .delete(authorization, accessControl, controller.deleteCategory)
  .put(authorization, accessControl, controller.updateCategory);
router.route('/gender/:gender_id').get(controller.getCategorysByGenderId);

module.exports = router;
