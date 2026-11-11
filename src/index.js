const fs = require("fs");
const errorHandle = require("./Erros/errorHandler");

const archivePath = process.argv;
const link = archivePath[2];

fs.readFile(link, "utf-8", (error, text) => {
  try {
    if(error) throw error
    wordsCounter(text);
  } catch(error) {
    console.log(errorHandle(error));
  }  
  
});

function wordsCleaner(text) {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); // isso aqui é uma RegEx ou Regular Expression -> /[.,\/#!$%\^&\*;:{}=\-_`~()]/g
}

function wordsCounter(text) {
  const paragraphs = paragraphExtractor(text);  
  const resultRepeatedWords = paragraphs.flatMap((paragraph) => {
    if (!paragraph) return [];
    return wordRepeatVerifier(paragraph);
  });
  console.log(resultRepeatedWords);
}

function paragraphExtractor(paragraph) {
  return paragraph.toLowerCase().split("\n");
}

function wordRepeatVerifier(text) {
  const wordsArray = text.split(" ");
  const result = {};

  wordsArray.forEach((word) => {
    const cleanerWord = wordsCleaner(word);
    result[cleanerWord] = (result[cleanerWord] || 0) + 1;
  });

  return result;
}
