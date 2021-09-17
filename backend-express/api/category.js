const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/category.controller');

router
  .route('/')
  .get(controller.getCategorys)
  .post(controller.insertCategory);
router
  .route('/:category_id')
  .delete(controller.deleteCategory)
  .put(controller.updateCategory);
router
  .route('/gender/:gender_id')
  .get(controller.getCategorysByGenderId);

module.exports = router;
