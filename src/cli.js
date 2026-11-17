import fs from 'fs';
import { wordsCounter } from './index.js';
import { outputText } from './helper.js';
import errorHandle from './Error/errorHandler.js';

const archivePath = process.argv;
const link = archivePath[2];
const path = archivePath[3];

fs.readFile(link, "utf-8", (error, text) => {
  try {
    if(error) throw error
    const wordsResult = wordsCounter(text);
    createArchiveTxt(wordsResult, path);
  } catch(error) {
    console.log(errorHandle(error));
  }  
});

async function createArchiveTxt(wordsCounter, adress) {
  const wordsCounterString = outputText(wordsCounter)
  const path = `${adress}/Words.txt`

  try {
    await fs.promises.writeFile(path, wordsCounterString);
    console.log("Ação bem sucedida! arquivo criado");
  } catch (error) {
    throw error;
  }
}