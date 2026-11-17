import fs from "fs";
import path from "path";
import { wordsCounter } from "./index.js";
import { outputText } from "./helper.js";
import errorHandle from "./Error/errorHandler.js";
import chalk from "chalk";
import { Command } from "commander";

const program = new Command();

program
  .version("0.1")
  .option("-t, --text <string>", "caminho do texto a ser processado")
  .option(
    "-d, --destiny <string>",
    "caminho da pasta a ser criado o arquivo de resultados"
  )
  .action((options) => {
    const { text, destiny } = options;

    if (!text || !destiny) {
      console.error(chalk.red("error favor inserir caminho de origem e destino"));
      program.help();
      return;
    }

    const textPath = path.resolve(text);
    const destinyPath = path.resolve(destiny);

    try {
      archiveProcessor(textPath, destinyPath);
      console.log(chalk.greenBright('arquivo processado com sucesso'));
    } catch(error) {
      console.log(chalk.redBright('ocorreu um erro no processamento', error.code));
    }

  });

program.parse();

function archiveProcessor(text, destiny) {
  fs.readFile(text, "utf-8", (error, text) => {
    try {
      if (error) throw error;
      const wordsResult = wordsCounter(text);
      createArchiveTxt(wordsResult, destiny);
    } catch (error) {
      console.log(errorHandle(error));
    }
  });
}

async function createArchiveTxt(wordsCounter, adress) {
  const wordsCounterString = outputText(wordsCounter);
  const path = `${adress}/Words.txt`;

  try {
    await fs.promises.writeFile(path, wordsCounterString);
    console.log("Ação bem sucedida! arquivo criado");
  } catch (error) {
    throw error;
  }
}
