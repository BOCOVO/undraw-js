/**
 * Creating UndrawJS object
 */

const prototype = {
    initialConfigs: {
        nameAttr: "data-ujs-name",// Custom attribute of nodes that specifies the name of the illustration
        colorAttr: "data-ujs-color",// Custom attribute of nodes that specifies the main color
        doneAttr: "data-ujs-done", // Custom attribute of nodes that specifies if the illustration is addded to the node
        fallbackAttr: "data-ujs-fall-img", // Custom attribute of nodes that specifies the fall image
        version: "0.0.1"
    },
    maxRetry: 2,
    retryDelay: 3000,
    initObserver() {
        if (!this.observed) {
            const observerCongifs = { childList: true ,subtree:true}
            const observer = new MutationObserver(() => {
                this.refresh()
            })
            observer.observe(document.body, observerCongifs)
            this.observed = true // define dom is observed
        } 
    },
    init(options = {}) {
        this.options = { ...this.initialConfigs, ...options }
        this.initObserver()
        this.refresh()
    },
    getUrl(illName) {
        return `https://unpkg.com/undraw-js@${this.options.version}/src/images/${illName}.svg`
    },
    async loadSvg(url, callBack, fallback, illName, count = 0) {
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
            const color = node.getAttribute(this.options.colorAttr) || this.options.defaultColor
            const fallImage = node.getAttribute(this.options.fallbackAttr)

            if (illName) {
                const url = this.getUrl(illName)
                this.loadSvg(url,
                    svg => {
                        node.src = this.getDataImage(svg, color)
                        node.setAttribute(this.options.doneAttr, "true")
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