const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/gender.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router
  .route('/')
  .get(controller.getGenders)
  .post(authorization, accessControl, controller.insertGender);
router
  .route('/:gender_id')
  .delete(authorization, accessControl, controller.deleteGender)
  .put(authorization, accessControl, controller.updateGender);

module.exports = router;
