const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/userrole.controller');

router
  .route('/')
  .get(controller.getUserRoles)
  .post(controller.insertUserRole);
router
  .route('/:userRole_id')
  .delete(controller.deleteUserRole)
  .patch(controller.updateUserRole);
router
  .route('/position')
  .post(controller.findUserRoleById);
router
  .route('/position/user')
  .get(controller.getUserRoleOfUser);

module.exports = router;
