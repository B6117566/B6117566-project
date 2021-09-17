const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/userrole.controller');

router
  .route('/')
  .get(controller.getUserRoles)
  .post(controller.insertUserRole);
router
  .route('/:userrole_id')
  .delete(controller.deleteUserRole)
  .patch(controller.updateUserRole);

module.exports = router;
