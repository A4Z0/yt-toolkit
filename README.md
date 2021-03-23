# What is this?

It's a package to Search Videos and Stream Video Audio from Youtube.

```js
const Class = require('./Index.js');
const Toolkit = new Class("Your Youtube API Token");
```

# How to use?

### Searching on Youtube
```js
Toolkit.Search("Search").then((Results) => {
    console.log(Results);
});
```

### Searching Videos on Youtube
```js
Toolkit.Search("Search", {
    Attempts: 10,
    Type: 'video'
}).then((Results) => {
    console.log(Results);
});
```

### Youtube Search Next Page
```js
Toolkit.Search("Search", {
    Attempts: 10,
    Type: 'video'
}).then((Results) => {
    Results["Page"].Next().then((Results) => {
        console.log(Results);
    });
});
```

### Youtube Search Prev Page
```js
/* Warning */
// Prev Page functions only appears if there is a previous page.

Toolkit.Search("Search", {
    Attempts: 10,
    Type: 'video'
}).then((Results) => {
    Results["Page"].Next().then((Results) => {
        Results["Page"].Prev().then((Results) => {
            console.log(Results);
        });
    });
});
```
### Streaming Audio (required: fs)
```js
Toolkit.Audio("Video Link or ID").then((Audio) => {
    Audio.pipe(require('fs').createWriteStream('Audio.mp3'));
});
```