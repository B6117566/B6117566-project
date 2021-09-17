const expressFunction = require("express");
const router = expressFunction.Router();
const controller = require('../controller/user.controller');

router.route('/signup')
  .post(controller.signupUser);
router.route('/signin')
  .post(controller.signinUser);
router.route('/:user_id')
  .get(controller.findUserById)
  .delete(controller.deleteUser)
  .patch(controller.updateUserSomeField);

module.exports = router;