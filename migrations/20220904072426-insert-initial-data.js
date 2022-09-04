module.exports = {
  async up(db, _client) {
    await db.collection('cache').insertMany([
      {
        key: 'key1',
        value: 'value1',
        ttl: 3600,
        expiresAt: Date.now() + 3600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'key2',
        value: 'value2',
        ttl: 3600,
        expiresAt: Date.now() + 3600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'key3',
        value: 'value3',
        ttl: 3600,
        expiresAt: Date.now() + 3600,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(db, _client) {
    await db.collection('cache').remove({});
  },
};
