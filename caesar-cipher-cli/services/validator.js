const fs = require('fs');
const {DECODE, ENCODE} = require('../constants/constants');

module.exports.isValidateKey = (key) => {
  if (typeof key !== 'number' || isNaN(key)) {
    console.error('shift is not number');
    return false;
  }
  if (key < 0) {
    console.error("shift isn't to be negative number")
    return false;
  }
  return true;
}

module.exports.isValidParams = (params) => {
  if(params === DECODE || params === ENCODE) {
    return true
  }
  console.error('is error action');
  return false;
};

module.exports.isValidPath = (input, output) => {
  if(!fs.existsSync(input)) {
    console.log('file not found input')
    return false;
  }
  if(!fs.existsSync(output)) {
    console.log('file not found input')
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
