const HttpStatusCodes = require('http-status-codes');
const { isEmpty, isNil } = require('lodash');
const { validationResult } = require('express-validator');

const CacheData = require('../models/CacheData');
const { generateRandomString, checkIfBeyondTtl } = require('../utils');

module.exports = {
  /**
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   *
   * Get all cached data
   */
  async getAll(req, res) {
    try {
      const cachedData = await CacheData.find({});
      return res.status(HttpStatusCodes.OK).json(cachedData);
    } catch (e) {
      console.error('Error in CacheController.getAll ---', e);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  /**
   *
   * @param req { params: { key } }
   * @param res
   * @returns {Promise<*>}
   *
   * Get cached data by key
   * If found, then log 'Cache hit'
   * check for expiry, if expired then reset the value to a random string
   * update the expiresAt value on every 'Cache hit'
   *
   * If not found, then log 'Cache miss'
   * create an entry with cache with a random string
   */
  async getOne(req, res) {
    try {
      const { key } = req.params;

      const cacheData = await CacheData.findOne({ key });

      // Found in cache
      if (!isEmpty(cacheData)) {
        console.log('Cache hit');

        if (checkIfBeyondTtl(cacheData?.expiresAt)) {
          cacheData.value = generateRandomString();
        }

        const newCachedData = await cachedData.save();
        return res.status(HttpStatusCodes.OK).json(newCachedData);
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
  /**
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   *
   * Update the data for a given key.
   * If not found, then create the data for given key.
   */
  async createOrUpdate(req, res) {
    try {
      const { errors } = validationResult(req);
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
      const createdCache = await CacheData.create({
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
  /**
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   *
   * Delete a record by key.
   */
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
  /**
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   *
   * Delete all records.
   */
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
