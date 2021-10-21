const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/user.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');
const userAccess = require('../middleware/userAccess');

router.route('/signup').post(controller.signupUser);
router.route('/signin').post(controller.signinUser);
router
  .route('/:user_id')
  .get(authorization, accessControl, userAccess, controller.findUserById)
  .delete(authorization, accessControl, controller.deleteUser)
  .patch(authorization, accessControl, controller.updateUserSomeField);

module.exports = router;
