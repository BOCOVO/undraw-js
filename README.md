# Welcome to this library

Undraw-js is a library allow you to add [undraw.co](https://undraw.co/illustrations) illustration to web page with a specifique color

## How to use it ?

- Installation

    ```html
    <script src="https://unpkg.com/undraw-js@1.0/index.min.js"></script>
    ```

    or use yarn or npm

    ```bash
    $ yarn add undraw-js
    ```

    ```bash
    $ npm i undraw-js
    ```

- Add some attribute to your `img` element

    ```html
    <img data-ujs-name="Ukraine" data-ujs-color="#f00" />
    ```

    About attributes

    |Options | Description | Required|
    |--------|-------------|---------|
    |`data-ujs-name`| Input here the name of the illustration| `yes` |
    |`data-ujs-color`| Input here the main color code you want| `no` |
    |`data-ujs-fall-img`|The image link to set as the source of the `img` element if the illustration failed to load.| `no` |

- Add this script to the page

    ```html
    <script>
        UndrawJS.init()
    </script>
    ```

    or

    ```js
      import UndrawJs from 'undraw-js'
      (new UndrawJs()).init()
    ```

## More customisation

You can provide options to Undraw object

```js
    const options = {
        nameAttr: "data-ujs-name", // Custom attribute of nodes that specifies the name of the illustration
        colorAttr: "data-ujs-color", // Custom attribute of nodes that specifies the main color
        doneAttr: "data-ujs-done", // Custom attribute of nodes that specifies if the illustration is addded to the node
        fallbackAttr: "data-ujs-fall-img", // Custom attribute of nodes that specifies the fall image
        defaultColor: "#f00" // To specify a default color
    };

    UndrawJS.init(options); // or (new UndrawJs()).init(options) for module user
```

## How to find illustration name ?

Go to [undraw.co](https://undraw.co/illustrations) find illustration you need and copy its name

## Notes

> Only the illustrations you add to your page are loaded.

> Illustration not loaded ? Undraw is constantly evolving. If the illustration does not load, perhaps the version of undraw-js you are using is deployed before the creation of this illustration. To fix this, see if there is a version of undraw-js higher than the version you are using, if it is the last version you are using then wait for a new update.
> There are over 1300 illustrations that you can use
