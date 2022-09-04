const Mongoose = require('mongoose');
const { getTimestampForExpiration } = require('../utils');
const { Schema } = Mongoose;

const defaultConfig = {
  cacheSize: 100,
  defaultTtl: 3600,
};

const cacheDataSchema = new Schema(
  {
    key: { type: String, unique: true },
    value: String,
    ttl: { type: Number, default: defaultConfig.defaultTtl },
    expiresAt: {
      type: Number,
      default: getTimestampForExpiration(defaultConfig.defaultTtl),
    },
  },
  { timestamps: true }
);

const CacheData = Mongoose.model('CacheData', cacheDataSchema, 'cache');

module.exports = CacheData;
