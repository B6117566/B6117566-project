const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/user.controller');
const authorization = require('../config/authorize');
const accessControl = require('../config/accessControl');

router.route('/signup').post(controller.signupUser);
router.route('/signin').post(controller.signinUser);
router
  .route('/:user_id')
  .get(authorization, accessControl, controller.findUserById)
  .delete(authorization, accessControl, controller.deleteUser)
  .patch(authorization, accessControl, controller.updateUserSomeField);

module.exports = router;
