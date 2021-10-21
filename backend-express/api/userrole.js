const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/userrole.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

router
  .route('/')
  .get(controller.getUserRoles)
  .post(authorization, accessControl, controller.insertUserRole);
router
  .route('/:userRole_id')
  .delete(authorization, accessControl, controller.deleteUserRole)
  .patch(authorization, accessControl, controller.updateUserRole);
router.route('/position').post(controller.findUserRoleById);
router.route('/position/user').get(controller.getUserRoleOfUser);

module.exports = router;
