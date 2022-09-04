const express = require('express');
const {
  getAll,
  getOne,
  deleteOne,
  deleteAll,
} = require('../controllers/CacheController');

const router = express.Router();

/* GET returns all stored keys in the cache */
router.get('/', getAll);

/* GET returns the cached data for a given key */
router.get('/:key', getOne);

/* POST creates the data for a given key */
router.post('/:key', function (req, res, _next) {
  res.send('respond with a resource');
});

/* PUT updates the data for a given key */
router.put('/:key', function (req, res, _next) {
  res.send('respond with a resource');
});

/* DELETE removes a given key from the cache */
router.delete('/:key', deleteOne);

/* DELETE removes all keys from the cache */
router.delete('/', deleteAll);

module.exports = router;
