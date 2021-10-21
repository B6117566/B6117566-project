const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/auth.controller');

router.route('/').post(controller.checkExpiresAuthorization);

module.exports = router;
