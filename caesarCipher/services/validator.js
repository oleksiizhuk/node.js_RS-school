const fs = require('fs');

module.exports.isValidateKey = (key) => {
  if (typeof key !== 'number') {
    console.log('key is not number');
    return false;
  }
  if (key < 0) {
    console.log("key isn't to be negative number")
    return false;
  }
  return true;
}

module.exports.checkPath = (path) => {
  return new Promise((res, rej) => {
    fs.access(path, (err) => {
      if (err) {
        console.error(err)
        return rej(err);
      }
      res(true);
    });
  })
}
