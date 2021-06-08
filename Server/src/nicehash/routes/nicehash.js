import express from 'express';
import validate from 'express-validation';
const router = express.Router();

import {
  info,
  credentials,
  updateCredentials,
  poolCredentials,
  updatePoolCredentials,
  speedLimit,
  updateSpeedLimit,
  order,
  cancelOrder,
  orderPrice,
  orderPriceDecrease,
  orderSpeedLimit
} from '../controllers/index.js'

import {
  infoValidator,
  credentialsValidator,
  updateCredentialsValidator,
  poolCredentialsValidator,
  updatePoolCredentialsValidator,
  speedLimitValidator,
  updateSpeedLimitValidator,
  orderValidator,
  cancelOrderValidator,
  orderPriceValidator,
  orderPriceDecreaseValidator,
  orderSpeedLimitValidator
} from '../validators/index.js'

router.get('/info', validate(infoValidator), info);
router.get('/credentials', validate(credentialsValidator), credentials);
router.put('/updateCredentials', validate(updateCredentialsValidator), updateCredentials);
router.get('/poolCredentials', validate(poolCredentialsValidator), poolCredentials);
router.put('/updatePoolCredentials', validate(updatePoolCredentialsValidator), updatePoolCredentials);
router.get('/speedLimit', validate(speedLimitValidator), speedLimit);
router.put('/updateSpeedLimit', validate(updateSpeedLimitValidator), updateSpeedLimit);
router.post('/order', validate(orderValidator), order);
router.post('/cancelOrder', validate(cancelOrderValidator), cancelOrder);
router.put('/orderPrice', validate(orderPriceValidator), orderPrice);
router.put('/orderPriceDecrease', validate(orderPriceDecreaseValidator), orderPriceDecrease);
router.put('/orderSpeedLimit', validate(orderSpeedLimitValidator), orderSpeedLimit);

export default router;
