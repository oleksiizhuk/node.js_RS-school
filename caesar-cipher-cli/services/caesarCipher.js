const {
  ALPHABET_LENGTH,
  DECODE,
  ASCII_BIG_A,
  ASCII_BIG_Z,
  ASCII_SMALL_A,
  ASCII_SMALL_Z
} = require('../constants/constants');

module.exports.caesarCipher = (str, userKey, userParam) => {
  const key = userKey % ALPHABET_LENGTH;
  const result = str.split('').map((letter) => {
    if (!isValidateText(letter.charCodeAt())) {
      return letter;
    }
    return code(userParam, letter.charCodeAt(), key, isLowerCase(letter))
  });
  return result.join('');
};


const code = (params, asciiLetter, key, isLowerCase) => {
  const flag = isLowerCase ? 97 : 65;
  if (params === DECODE) {
    return String.fromCharCode((asciiLetter + key - flag) % ALPHABET_LENGTH + flag);
  } else {
    return String.fromCharCode((asciiLetter - key - flag) % ALPHABET_LENGTH + flag);
  }
}

isLowerCase = (letter) => letter.toLowerCase() === letter;

const isValidateText = (asciiLetter) => (
  asciiLetter >= ASCII_BIG_A && asciiLetter <= ASCII_BIG_Z ||
  asciiLetter >= ASCII_SMALL_A && asciiLetter <= ASCII_SMALL_Z
);

