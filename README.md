# Welcome to this library

Undraw-js is a library allow you to add [undraw.co](undraw.co) illustration to web page with a specifique color

## How to use it ?

- Add js script to your page

    ```html
    <script src="https://unpkg.com/undraw-js/0.0.1/index.js"></script>
    ```
    This file load the svg file and add the main color you specify

- Add `img` element to you page
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

    ```js
        UndrawJs.init()
    ```
    or ( For more customisation )

    ```js
        const options = {
            nameAttr: "data-ujs-name", // Custom attribute of nodes that specifies the name of the illustration
            colorAttr: "data-ujs-color", // Custom attribute of nodes that specifies the main color
            doneAttr: "data-ujs-done", // Custom attribute of nodes that specifies if the illustration is addded to the node
            fallbackAttr: "data-ujs-fall-img", // Custom attribute of nodes that specifies the fall image
            defaultColor: "#f00" // To specify a default color
        };

        UndrawJs.init(options);
    ```

## How to find illustration name ? 
 
 Go to [undraw.co](https://undraw.co/illustrations) add illustration you need and copy its name