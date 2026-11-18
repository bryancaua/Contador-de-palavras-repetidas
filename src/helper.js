function ocorrenciesFilter(paragraph) {
    return Object.keys(paragraph).filter(key => paragraph[key] > 1);
}

export function outputText(wordsCounter) {
    let finalText = '';

    wordsCounter.forEach((paragraph, index) => {
        const duplicates = ocorrenciesFilter(paragraph).join(', ');
        if (duplicates === '') {
            return finalText += `Sem palavras duplicadas no parágrafo ${index + 1} \n`;
        }
        finalText += `Palavras duplicadas no parágrafo ${index + 1}: ${duplicates} \n`;
    });

    return finalText;
}