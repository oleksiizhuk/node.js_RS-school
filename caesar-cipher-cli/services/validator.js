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
