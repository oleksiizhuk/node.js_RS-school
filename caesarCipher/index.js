const {
  ALPHABET_LENGTH,
  DECODE,
  ENCODE,
  ASCII_BIG_A,
  ASCII_BIG_Z,
  ASCII_SMALL_A,
  ASCII_SMALL_Z
} = require('./constants/constants');

const caesarCipher = (userParam, userKey, str) => {
  if(isValidateKey(userKey) && isValidParam(userParam) ) {
    console.log('didnt valid')
    return;
  }
  const key = userKey % ALPHABET_LENGTH;

  const result = str.split('').map((letter) => {
    if (!isValidateText(letter)) {
      return letter;
    }
    const asciiLetter = letter.charCodeAt();
    return code(param, asciiLetter, key, isLowerCase(asciiLetter))
  });
  console.log('result - ', result.join(''));
};

const isValidParam = (params) => {
  if (params === DECODE || params === ENCODE) {
    return true;
  }
  console.log('not valid params');
  return false;
};

const isValidateKey = (key) => {
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

const code = (params, asciiLetter, key, isLowerCase) => {
  const flag = isLowerCase ? 97 : 65;
  if (params === DECODE) {
    return String.fromCharCode((asciiLetter + key - flag) % ALPHABET_LENGTH + flag);
  } else {
    return String.fromCharCode((asciiLetter + key - flag) % ALPHABET_LENGTH + flag);
  }
}


const isLowerCase = (asciiLetter) => (asciiLetter >= ASCII_SMALL_A && asciiLetter <= ASCII_SMALL_Z);

const isValidateText = (asciiLetter) => (
  asciiLetter >= ASCII_BIG_A && asciiLetter <= ASCII_BIG_Z ||
  asciiLetter >= ASCII_SMALL_A && asciiLetter <= ASCII_SMALL_Z
);

caesarCipher('decode', 'a', 'HELLO hello AZ az ()_9_0_() Привет!');
