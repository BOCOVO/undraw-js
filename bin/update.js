import { Command } from 'commander';
import { existsSync } from "fs";
import ora from 'ora';
import readline from "readline";

import getIllustrationList from '../utils/getIllustrationList.js';
import { getIlluFilePath, writeIlluFile } from '../utils/utils.js';

const program = new Command();
program
  .description('Split a string into substrings and display as an array')
  .option('-a, --all', "Update all illustrations.");

program.parse();
const updateAll = program.opts().all;

const handleIllus = async (illos) => {
  const spinner = ora("Start writting file").start()

  let newIlluCount = 0
  const failed = []
  const illosCount = illos.length
  for (let i = 0; i < illos.length; i += 1) {
    const ill = illos[i]
    spinner.text = `Handling: ${ill.title} ${i + 1}/${illosCount} \n`
    const exist = existsSync(getIlluFilePath(ill.title))
    if (!exist) newIlluCount += 1
    if (!exist || (exist && updateAll)) {
      try {
        /* eslint-disable no-await-in-loop */
        await writeIlluFile(ill)
      } catch (error) {
        failed.push(ill)
        console.log(`Unable to write ill ${ill.title}`)
        console.log(error)
      }
    }
  }
  spinner.stop()
  // stat
  console.log(`${newIlluCount} new illustration was added`)

  // handle failed
  if (failed.length > 0) {
    const rl = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout,
      },
    )
    console.log(`There are ${failed.length} failed illustrations`)
    rl.question("Do you want to retry saving ? Y/N", (result) => {
      if (result === "Y") {
        handleIllus(failed)
      }
    })
  }
}

// eslint-disable-next-line func-names
// eslint-disable-next-line wrap-iife
(async function () {
  try {
    const illos = await getIllustrationList()
    console.log(`There are ${illos.length} illustrations`)
    handleIllus(illos)
  } catch (error) {
    console.log(error)
  }
})()
