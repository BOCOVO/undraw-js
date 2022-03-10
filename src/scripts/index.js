/**
 * Creating UndrawJS object
 */

const prototype = {
    initialConfigs: {
        nameAttr: "data-ujs-name",
        colorAttr: "data-ujs-color",
        doneAttr: "data-ujs-done",
        fallbackAttr: "data-ujs-fall-img",
        version: "0.0.1"
    },
    maxRetry: 2,
    retryDelay: 3000,
    init(options = {}) {
        this.options = { ...this.initialConfigs, ...options }
        this.refresh()
    },
    getUrl(illName) {
        return `https://unpkg.com/undraw-js@${this.options.version}/src/images/${illName}.svg`
    },
    async loadSvg (url, callBack, fallback, illName, count = 0) {
        // load svg from unpkg 
        const errorHandler = () => {
            if (count < this.maxRetry) { 
                setTimeout(() => {
                    this.loadSvg(url, callBack, fallback, illName, count + 1)
                }, this.retryDelay)
            }
            else {
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
            }
            else errorHandler()
        } catch (error) {
            errorHandler()
        }
    },
    getDataImage(svg, color) {
        svg = this.replaceColor(svg, color)
        return "data:image/svg+xml;utf8," + encodeURIComponent(svg)
    },
    replaceColor(svg, color) {
        return color ? svg.replace(/#6c63ff/g, color) : svg
    },
    refresh() {
        const nodes = document.querySelectorAll(`img[${this.options.nameAttr}]:not([${this.options.doneAttr}])`)
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            const illName = node.getAttribute(this.options.nameAttr)
            const color = node.getAttribute(this.options.colorAttr)
            const fallImage = node.getAttribute(this.options.fallbackAttr)

            if (illName) {
                const url = this.getUrl(illName)
                this.loadSvg(url,
                    svg => {
                        node.src = this.getDataImage(svg, color)
                    },
                    () => {
                        if (!node.getAttribute("alt")) node.setAttribute("alt", illName)
                        if (fallImage) node.src = fallImage
                    }, illName)
            }
        }
    }
}

window.UndrawJS = Object.setPrototypeOf({}, prototype)