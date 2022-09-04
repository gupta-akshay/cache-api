const HttpStatusCodes = require('http-status-codes');
const { isEmpty, isNil } = require('lodash');
const { validationResult } = require('express-validator');

const CacheData = require('../models/CacheData');
const { generateRandomString } = require('../utils');

module.exports = {
  async getAll(req, res) {
    try {
      const cachedData = await CacheData.find({});
      return res.status(HttpStatusCodes.OK).json(cachedData);
    } catch (e) {
      console.error('Error in CacheController.getAll ---', e);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
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

      // Not found in cache
      console.log('Cache miss');
      const value = generateRandomString();
      await CacheData.create({
        key,
        value,
      });

      return res.status(HttpStatusCodes.CREATED).json({ value });
    } catch (e) {
      console.error('Error in CacheController.getOne ---', e);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  async createOrUpdate(req, res) {
    try {
      const errors = validationResult(req);
      if (!isEmpty(errors)) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json(errors);
      }

      const { key } = req.params;
      const { value, ttl } = req.body;

      const cachedData = await CacheData.findOne({ key });

      // already exists
      if (!isEmpty(cachedData)) {
        cachedData.value = value;
        if (!isNil(ttl)) {
          cachedData.ttl = ttl;
        }
        const newCachedData = await cachedData.save();
        return res.status(HttpStatusCodes.OK).json(newCachedData);
      }

      // create new record
      const createdCache = new CacheData({
        key,
        value,
        ttl,
      });
      return res.status(HttpStatusCodes.CREATED).json(createdCache);
    } catch (e) {
      console.error('Error in CacheController.createOrUpdate ---', e);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  async deleteOne(req, res) {
    try {
      const { key } = req.params;

      const deletedCount = await CacheData.deleteOne({ key });
      return res.status(HttpStatusCodes.OK).json(deletedCount);
    } catch (e) {
      console.error('Error in CacheController.deleteOne ---', e);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  async deleteAll(req, res) {
    try {
      const deletedCount = await CacheData.deleteMany({});
      return res.status(HttpStatusCodes.OK).json(deletedCount);
    } catch (e) {
      console.error('Error in CacheController.deleteAll ---', e);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
