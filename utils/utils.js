import { writeFileSync } from "fs"
import fetch from "node-fetch"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

export const getIllusFilePath = (name) => {
  // eslint-disable-next-line no-underscore-dangle
  const __dirname = dirname(fileURLToPath(import.meta.url))
  return resolve(__dirname, `../illus/${name}.svg`)
}

export const writeIllusFile = async (ill) => {
  const response = await fetch(ill.image)
  if (response.ok) {
    const content = await response.text()
    writeFileSync(getIllusFilePath(ill.title), content)
  }
}
