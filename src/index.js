function wordsCleaner(text) {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); // isso aqui é uma RegEx ou Regular Expression -> /[.,\/#!$%\^&\*;:{}=\-_`~()]/g
}

export function wordsCounter(text) {
  const paragraphs = paragraphExtractor(text);  
  const resultRepeatedWords = paragraphs.flatMap((paragraph) => {
    if (!paragraph) return [];
    return wordRepeatVerifier(paragraph);
  });
  return resultRepeatedWords;
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
