const fs = require('fs');

const archivePath = process.argv;
const link = archivePath[2];

fs.readFile(link, 'utf-8', (error, text) => {
    paragraphsBreak(text);
})

// isso aqui é uma regex ou Expressões regulares -> /[.,\/#!$%\^&\*;:{}=\-_`~()]/g pega tudo que tiver englobando dentro do /[]/ e o -> g significa global, ou seja aplicar em TUDO do que a gente estiver passando.

function wordsCleaner(text) {
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function paragraphsBreak(text) {
    const paragraphs = text.toLowerCase().split('\n');
    const resultRepeatedWords = paragraphs.flatMap((paragraph) => {
        if(!paragraph) return [];
        return wordRepeatVerifier(paragraph);
    })
    console.log(resultRepeatedWords);
}

function wordRepeatVerifier(text) {
    const wordsArray = text.split(' ');
    const result = {}

    wordsArray.forEach(word => {
        const cleanerWord = wordsCleaner(word)
        result[cleanerWord] = (result[cleanerWord] || 0) + 1;
    });

    return result;
}