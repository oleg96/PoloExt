import express from 'express';
import validate from 'express-validation';
const router = express.Router();

import {
  info,
  price,
  updatePrice,
  profit,
  updateProfit,
  orderSum,
  updateOrderSum,
  speed,
  updateSpeed
} from '../controllers/index.js'

import {
  infoValidator,
  priceValidator,
  updatePriceValidator,
  profitValidator,
  updateProfitValidator,
  orderSumValidator,
  updateOrderSumValidator,
  speedValidator,
  updateSpeedValidator
} from '../validators/index.js'

router.get('/info', validate(infoValidator), info);
router.get('/price', validate(priceValidator), price);
router.put('/updatePrice', validate(updatePriceValidator), updatePrice);
router.get('/profit', validate(profitValidator), profit);
router.put('/updateProfit', validate(updateProfitValidator), updateProfit);
router.get('/orderSum', validate(orderSumValidator), orderSum);
router.put('/updateOrderSum', validate(updateOrderSumValidator), updateOrderSum);
router.get('/speed', validate(speedValidator), speed);
router.put('/updateSpeed', validate(updateSpeedValidator), updateSpeed);

export default router;
