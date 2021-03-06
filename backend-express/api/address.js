const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/address.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

router.route('/').post(authorization, accessControl, controller.insertAddress);
router
  .route('/:address_id')
  .delete(authorization, accessControl, controller.deleteAddress)
  .put(authorization, accessControl, controller.updateAddress);
router.route('/province/:province_id').get(controller.getAddressByProvinceId);

module.exports = router;
