/* eslint-disable no-underscore-dangle */
import { applyIllustration } from "./utils";
import VERSION from "./version";

class Undraw {
  _observed = false;

  initialConfigs = {
    nameAttr: "data-ujs-name", // Custom attribute of nodes that specifies the name of the illustration
    colorAttr: "data-ujs-color", // Custom attribute of nodes that specifies the main color
    doneAttr: "data-ujs-done", // Custom attribute of nodes that specifies if the illustration is addded to the node
    fallbackAttr: "data-ujs-fall-img", // Custom attribute of nodes that specifies the fall image
    version: VERSION,
  }

  maxRetry = 2;

  retryDelay = 2000;

  _initObserver = () => {
    if (!this._observed) {
      const observerConfigs = { childList: true, subtree: true };
      const observer = new MutationObserver(this._observerCallback);
      observer.observe(document.body, observerConfigs);
      this._observed = true; // define dom is observed
    }
  };

  _getQuerySelector = () => `img[${this.options.nameAttr}]:not([${this.options.doneAttr}])`;

  _observerCallback = (mutations) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const mutation of mutations) {
      // eslint-disable-next-line no-restricted-syntax
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.matches && addedNode.matches(this._getQuerySelector())) {
          applyIllustration([addedNode], this.options);
        } else if (addedNode.querySelectorAll) {
          const nodes = addedNode.querySelectorAll(this._getQuerySelector());
          if (nodes.length) {
            applyIllustration(addedNode, this.options);
          }
        }
      }
    }
  };

  init = (options = {}) => {
    this.options = { ...this.initialConfigs, ...options };
    this._initObserver();
    this.refresh();
  };

  refresh = () => {
    const nodes = document.querySelectorAll(this._getQuerySelector());
    applyIllustration(nodes, this.options);
  };
}

export default Undraw;
