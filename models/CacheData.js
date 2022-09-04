const Mongoose = require('mongoose');
const { getTimestampForExpiration } = require('../utils');
const { Schema } = Mongoose;

const defaultConfig = {
  cacheSize: 4,
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

cacheDataSchema.pre('save', async function (next) {
  const toSave = this;

  if (toSave.ttl) {
    toSave.expiresAt = getTimestampForExpiration(item.ttl);
  }

  // if a new item is created then
  // we have access to a document property 'isNew'
  // this lets us know if the object being saved
  // is being created or being updated.
  if (toSave.isNew) {
    const countOfCachedItems = await CacheData.countDocuments();
    if (countOfCachedItems >= defaultConfig.cacheSize) {
      console.log('Cache size limit reached...');
      const oldestCacheData = await CacheData.findOne(
        {},
        {},
        { sort: { createdAt: 1 } }
      );
      await CacheData.deleteOne({ key: oldestCacheData.key });
    }
  }
  next();
});

const CacheData = Mongoose.model('CacheData', cacheDataSchema, 'cache');

module.exports = CacheData;
