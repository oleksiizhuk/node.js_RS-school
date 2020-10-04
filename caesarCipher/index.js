const caesarCipher = require('./services/caesarCipher')
const fs = require('fs');
const {pipeline, Transform} = require('stream');
const {program} = require('commander');
const {isValidateKey} = require('./services/validator');
const {DECODE, ENCODE, UTF8} = require('./constants/constants');
program.storeOptionsAsProperties(true);
program
  .option('-s, --shift <value>', 'int val', v => parseInt(v, 10), 0)
  .option('-a, --action <value>')
  .option('-i, --input <value>', 'input path')
  .option('-o, --output <value>', 'output.path');
program.parse(process.argv);

console.log(`shift:     ${program.shift}`)
console.log(`input:     ${program.input}`)
console.log(`output:    ${program.output}`)
console.log(`action:    ${program.action}`)

const {input, output, action, shift} = program;
console.log(input, output, action, shift);

const checkCommandParams = () => {
  if (!isValidateKey(shift)) {
    console.log(1);
    return;
  }
  if (!fs.statSync(input).isFile() || !fs.statSync(output).isFile()) {
    console.log(2);
    return;
  }
  if (action === DECODE || action === ENCODE) {
    console.log(3, action)
    // return;
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
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  )
};

checkCommandParams(input, output, action, shift);
