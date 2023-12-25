import { writeFileSync } from "fs"
import fetch from "node-fetch"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

export const getIlluFilePath = (name) => {
  // eslint-disable-next-line no-underscore-dangle
  const __dirname = dirname(fileURLToPath(import.meta.url))
  return resolve(__dirname, `../illus/${name}.svg`)
}

export const writeIlluFile = async (ill) => {
  const response = await fetch(ill.image)
  if (response.ok) {
    const content = await response.text()
    writeFileSync(getIlluFilePath(ill.title), content)
  }
}
