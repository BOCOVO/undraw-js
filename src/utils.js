const getUrl = (illName, version) => `https://unpkg.com/undraw-js@${version}/illus/${illName}.svg`

const loadSvg = async (url, callBack, fallback, illName, options, count = 0) => {
  // load svg from unpkg
  const errorHandler = () => {
    if (count < options.maxRetry) {
      setTimeout(() => {
        loadSvg(url, callBack, fallback, illName, options, count + 1)
      }, options.retryDelay)
    } else {
      fallback()
    }
  }

  try {
    const request = await fetch(url)
    if (request.status === 200) {
      const response = await request.text()
      try {
        callBack(response)
      } catch (error) {
        console.log(error)
      }
    } else errorHandler()
  } catch (error) {
    errorHandler()
  }
}

const replaceColor = (svg, color) => (color ? svg.replace(/#6c63ff/g, color) : svg)

const getDataImage = (svg, color) => {
  const svgWithColor = replaceColor(svg, color)
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgWithColor)}`
}

// eslint-disable-next-line import/prefer-default-export
export const applyIllustration = (nodes, options) => {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    const illName = node.getAttribute(options.nameAttr)
    const color = node.getAttribute(options.colorAttr) || options.defaultColor
    const fallImage = node.getAttribute(options.fallbackAttr)

    if (illName) {
      const url = getUrl(illName, options.version)
      loadSvg(
        url,
        (svg) => {
          node.src = getDataImage(svg, color)
          node.setAttribute(options.doneAttr, "true")
        },
        () => {
          if (fallImage) node.src = fallImage
          else if (!node.getAttribute("alt")) node.setAttribute("alt", illName)
          console.error(`[undraw] failed to load illustration ${illName}`)
        },
        illName,
        options,
      )
    } else console.error("[undraw] Illustration name not provided")
  }
}
