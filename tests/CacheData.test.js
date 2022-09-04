const { assert, expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const CacheData = require('../models/CacheData');

describe('CacheData Model Tests', () => {
  it('should get cache data by key', (done) => {
    const CacheDataMock = sinon.mock(CacheData);
    const expected = {
      _id: '63146b8dd5f0feb6aeef488f',
      key: 'key1',
      value: 'value1',
      ttl: 3600,
      expiresAt: 1662282640683,
      createdAt: '2022-09-04T09:10:37.083Z',
      updatedAt: '2022-09-04T09:10:37.083Z',
    };

    CacheDataMock.expects('findOne')
      .withArgs({
        key: 'key1',
      })
      .yields(null, expected);

    CacheData.findOne({ key: 'key1' }, (e, result) => {
      CacheDataMock.verify();
      CacheDataMock.restore();
      expect(e).to.be.null;
      expect(result.key).to.equal('key1');
      expect(result._id).to.equal(expected._id);
      done();
    });
  });

  it('should remove cache data by key', (done) => {
    const CacheDataMock = sinon.mock(CacheData);
    const expected = {
      acknowledged: true,
      deletedCount: 1,
    };

    CacheDataMock.expects('deleteOne')
      .withArgs({
        key: 'key1',
      })
      .yields(null, expected);

    CacheData.deleteOne({ key: 'key1' }, (e, result) => {
      CacheDataMock.verify();
      CacheDataMock.restore();
      expect(e).to.be.null;
      expect(result.acknowledged).to.be.true;
      expect(result.deletedCount).to.equal(1);
      done();
    });
  });
});
