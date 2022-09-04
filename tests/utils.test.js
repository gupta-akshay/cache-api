const { expect } = require('chai');
const {
  generateRandomString,
  getTimestampForExpiration,
  checkIfBeyondTtl,
} = require('../utils');

describe('Utils tests', () => {
  it('should return random string with specified length', () => {
    const result = generateRandomString(80);
    expect(result).to.be.a('string');
    expect(result).to.have.lengthOf(80);
  });
  it('should return a timestamp for expiration', () => {
    const result = getTimestampForExpiration(3600);
    expect(result).to.be.a('number');
  });
  it('should return a boolean after expiration check', () => {
    const result = checkIfBeyondTtl(Date.now() + 3600);
    expect(result).to.be.true;
  });
});
