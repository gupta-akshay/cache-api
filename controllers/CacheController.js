const HttpStatusCodes = require('http-status-codes');
const { isEmpty } = require('lodash');
const { body, param } = require('express-validator');

const CacheData = require('../models/CacheData');

module.exports = {
  async getAll(req, res) {
    try {
      const cachedData = await CacheData.find({});
      res.status(HttpStatusCodes.OK).json(cachedData);
    } catch (e) {
      console.error('Error in CacheController.getAll ---', e);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  async getOne(req, res) {
    try {
      const { key } = req.params;

      const cacheData = await CacheData.findOne({ key });

      // Found in cache
      if (!isEmpty(cacheData)) {
        console.log('Cache hit');
        return res.status(HttpStatusCodes.OK).json(cacheData);
      }

      // not found in cache
      console.log('Cache miss');
      /**
       * TODO -
       * 1. Create a random string
       * 2. Create record in cache with this random string as value
       * 3. Return the random string in response
       */

      return res
        .status(HttpStatusCodes.CREATED)
        .json({ value: 'randomString' });
    } catch (e) {
      console.error('Error in CacheController.getOne ---', e);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  async deleteOne(req, res) {
    try {
      const { key } = req.params;

      const deletedCount = await CacheData.deleteOne({ key });
      res.status(HttpStatusCodes.OK).json(deletedCount);
    } catch (e) {
      console.error('Error in CacheController.deleteOne ---', e);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  async deleteAll(req, res) {
    try {
      const deletedCount = await CacheData.deleteMany({});
      res.status(HttpStatusCodes.OK).json(deletedCount);
    } catch (e) {
      console.error('Error in CacheController.deleteAll ---', e);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
