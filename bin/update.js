import { Command } from "commander";
import { existsSync } from "fs";
import ora from "ora";
import readline from "readline";

import getIllustrationList from "../utils/getIllustrationList.js";
import { getIllusFilePath, writeIllusFile } from "../utils/utils.js";

const program = new Command();
program
  .description("Split a string into substrings and display as an array")
  .option("-a, --all", "Update all illustrations.");

program.parse();
const updateAll = program.opts().all;

const handleIllus = async (illus) => {
  const spinner = ora("Start writing file").start();

  let newIllusCount = 0;
  const failed = [];
  const illusCount = illus.length;
  for (let i = 0; i < illus.length; i += 1) {
    const ill = illus[i];
    spinner.text = `Handling: ${ill.title} ${i + 1}/${illusCount} \n`;
    const exist = existsSync(getIllusFilePath(ill.title));

    if (!exist) newIllusCount += 1;

    if (!exist || (exist && updateAll)) {
      try {
        /* eslint-disable no-await-in-loop */
        await writeIllusFile(ill);
      } catch (error) {
        failed.push(ill);
        console.info(`Unable to write ill ${ill.title}`);
        console.error(error);
      }
    }
  }
  spinner.stop();

  console.info(`${newIllusCount} new illustration was added`);

  if (failed.length > 0) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.info(`There are ${failed.length} failed illustrations`);

    rl.question("Do you want to retry saving ? Y/N", (result) => {
      if (result === "Y") {
        handleIllus(failed);
      }
    });
  }
};

// eslint-disable-next-line func-names
// eslint-disable-next-line wrap-iife
const updateIllus = async () => {
  try {
    const illus = await getIllustrationList();
    console.info(`There are ${illus.length} illustrations`);
    handleIllus(illus);
  } catch (error) {
    console.error(error);
  }
};

updateIllus();
