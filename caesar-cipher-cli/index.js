const fs = require('fs');
const {pipeline, Transform} = require('stream');
const {program} = require('commander');
const process = require('process')
const {isValidateKey, isValidPath, isValidParams} = require('./services/validator');
const caesarCipher = require('./services/caesarCipher')
const {DECODE, ENCODE, UTF8} = require('./constants/constants');
program.storeOptionsAsProperties(true);
program
  .option('-s, --shift <value>', 'int val', v => parseInt(v, 10), 0)
  .option('-a, --action <value>')
  .option('-i, --input <value>', 'input path')
  .option('-o, --output <value>', 'output.path');
program.parse(process.argv);

const {input, output, action, shift} = program;
// console.log('program - ', input, output, action, shift);

const checkCommandParams = () => {

  if (!isValidateKey(shift)) {
    process.exit(1)
  }

  if (!isValidPath(input, output)) {
    process.exit(1)
  }

  if (!isValidParams(action)) {
    process.exit(1)
  }

  const newTransform = new Transform({
      transform(chunk, encoding, callback) {
        console.log('chunk - ', chunk.toString());
        console.log('shift - ', shift);
        const newData = caesarCipher.caesarCipher(chunk.toString(), shift, action);
        callback(null, newData);
      }
    }
  );

  pipeline(
    fs.createReadStream(input, UTF8),
    newTransform,
    fs.createWriteStream(output, {encoding: UTF8, flags: 'a+'}),
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

checkCommandParams(input, output, action, shift);


// 6 если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin
// 7 если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout
// 9 если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст
