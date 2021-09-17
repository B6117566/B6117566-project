const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/gender.controller');

router
  .route('/')
  .get(controller.getGenders)
  .post(controller.insertGender);
router
  .route('/:gender_id')
  .delete(controller.deleteGender)
  .put(controller.updateGender);

module.exports = router;
