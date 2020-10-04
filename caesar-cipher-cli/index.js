const fs = require('fs');
const { pipeline, Transform } = require('stream');
const { program } = require('commander');
const { isValidateKey, isValidParams } = require('./services/validator');
const caesarCipher = require('./services/caesarCipher')
const { UTF8 } = require('./constants/constants');
program.storeOptionsAsProperties(true);
program
  .option('-s, --shift <value>', 'int val', v => parseInt(v, 10), 0)
  .option('-a, --action <value>')
  .option('-i, --input <value>', 'input path')
  .option('-o, --output <value>', 'output path');
program.parse(process.argv);

const { input, output, action, shift } = program;

const main = () => {
  if (!isValidateKey(shift)) {
    process.exit(1)
  }
  if (!isValidParams(action)) {
    process.exit(1)
  }

  const newTransform = new Transform({
      transform(chunk, encoding, callback) {
        const newData = caesarCipher.caesarCipher(chunk.toString(), shift, action);
        callback(null, newData.replace(/\r?\n|\r/g, " "));
      }
    }
  );

  pipeline(
    input ? fs.createReadStream(input, UTF8) : process.stdin,
    newTransform,
    output ? fs.createWriteStream(output, {encoding: UTF8, flags: 'a+'}) : process.stdout,
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
        process.exit(1)
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  )
};

main(input, output, action, shift);
