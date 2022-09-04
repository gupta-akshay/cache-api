exports.getTimestampForExpiration = (ttl) => Date.now() + ttl;

exports.generateRandomString = (length = 70) => {
  let result = '';
  const characterSet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    result += characterSet.charAt(
      Math.floor(Math.random() * characterSet.length)
    );
  }

  return result;
};
