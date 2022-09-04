const express = require('express');
const { param, body } = require('express-validator');
const { isFinite } = require('lodash');
const {
  getAll,
  getOne,
  deleteOne,
  deleteAll,
  createOrUpdate,
} = require('../controllers/CacheController');

const router = express.Router();

/* GET returns all stored keys in the cache */
router.get('/', getAll);

/* GET returns the cached data for a given key */
router.get('/:key', getOne);

/* POST creates or updates the data for a given key */
router.post(
  '/:key',
  [
    param('key').exists().notEmpty().isString(),
    body('value').exists().notEmpty().isString(),
    body('ttl')
      .optional()
      .custom((value) => isFinite(value)),
  ],
  createOrUpdate
);

/* DELETE removes a given key from the cache */
router.delete('/:key', deleteOne);

/* DELETE removes all keys from the cache */
router.delete('/', deleteAll);

module.exports = router;
