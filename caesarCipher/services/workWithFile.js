// const readWithFile = (path) => {
//   return new Promise((res, rej) => {
//     fs.readFile(path, 'utf8', (err, data) => {
//       if (err) {
//         return rej(err);
//       }
//       res(data);
//     })
//   })
// };
//
// const writeToFile = async (text, path) => {
//   fs.writeFile(path, text, UTF8, (error) => {
//     if (error) {
//       console.error(error);
//     }
//   })
// };
//
// const checkPath = (path) => {
//   return new Promise((res, rej) => {
//     fs.access(path, (err) => {
//       if (err) {
//         console.error(err)
//         return rej(err);
//       }
//       res(true);
//     });
//   })
// }
//
// const workWithFile = async (userPrams, key, inputPath, outputPath) => {
//   try {
//     const checkInputPath = await checkPath(inputPath);
//     const checkOutputPath = await checkPath(outputPath);
//     console.log('checkInputPath - ', checkInputPath)
//     console.log('checkOutputPath - ', checkOutputPath)
//     const inputFile = readWithFile(inputPath);
//     const inputFileString = await inputFile;
//     const outputFile = readWithFile(outputPath);
//     const outputFileString = await outputFile;
//     const encryptionCode = caesarCipher.caesarCipher(inputFileString, key, userPrams);
//     const result = outputFileString.concat(encryptionCode);
//     console.log('++++++ - ', result);
//     await writeToFile(result, './output.txt')
//   } catch (err) {
//     console.log('BED', err)
//   }
// };
