import fetch from "node-fetch"
import oraSpinner from "ora"

const MAIN_URL = "https://undraw.co/api/illustrations?page="

const getIllusFromPage = async (page, accumulationList, onChange) => {
  onChange(page)
  const response = await fetch(MAIN_URL + page)
  if (response.ok) {
    const responseData = await response.json()
    responseData.illos.forEach(
      (item) => accumulationList.push({ image: item.image, title: item.title }),
    )
    if (responseData.hasMore) {
      await getIllusFromPage(page + 1, accumulationList, onChange)
    }
  }
  return accumulationList
}

/**
 * Return illustration list
 */
const getIllustrationList = async () => {
  const spinner = oraSpinner("Start Loading").start()
  try {
    const illos = await getIllusFromPage(0, [], (currentPage) => { spinner.text = `Loading page ${currentPage}` })
    spinner.info("Finish illustration page loading")
    return illos
  } catch (error) {
    spinner.fail("Load failed")
    throw error
  }
}

export default getIllustrationList
