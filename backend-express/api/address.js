const expressFunction = require('express');
const router = expressFunction.Router();
const controller = require('../controller/address.controller');

router
  .route('/')
  .post(controller.insertAddress);
router
  .route('/:address_id')
  .delete(controller.deleteAddress)
  .put(controller.updateAddress);
router
  .route('/province/:province_id')
  .get(controller.getAddressByProvinceId);

module.exports = router;
