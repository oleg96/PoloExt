import express from 'express';
import validate from 'express-validation';
const router = express.Router();

import {
  info,
  credentials,
  updateCredentials,
  withdraw,
  wallet,
  updateWallet,
  exchangeRatio,
  updateExchangeRatio,
  exchange,
  cancelExchange
} from '../controllers/index.js'

import {
  infoValidator,
  credentialsValidator,
  updateCredentialsValidator,
  withdrawValidator,
  walletValidator,
  updateWalletValidator,
  exchangeRatioValidator,
  updateExchangeRatioValidator,
  exchangeValidator,
  cancelExchangeValidator
} from '../validators/index.js'

router.get('/info', validate(infoValidator), info);
router.get('/credentials', validate(credentialsValidator), credentials);
router.put('/updateCredentials', validate(updateCredentialsValidator), updateCredentials);
router.post('/withdraw', validate(withdrawValidator), withdraw);
router.get('/wallet', validate(walletValidator), wallet);
router.put('/updateWallet', validate(updateWalletValidator), updateWallet);
router.get('/exchangeRatio', validate(exchangeRatioValidator), exchangeRatio);
router.put('/updateExchangeRatio', validate(updateExchangeRatioValidator), updateExchangeRatio);
router.post('/exchange', validate(exchangeValidator), exchange);
router.post('/cancelExchange', validate(cancelExchangeValidator), cancelExchange);

export default router;
