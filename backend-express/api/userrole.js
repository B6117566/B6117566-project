const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/userrole.controller');

router
  .route('/')
  .get(controller.getUserRoles)
  .post(controller.insertUserRole);
router
  .route('/:userRole_id')
  .get(controller.findUserRoleById)
  .delete(controller.deleteUserRole)
  .patch(controller.updateUserRole);
router
  .route('/author/user')
  .get(controller.getUserRoleOfUser);

module.exports = router;
