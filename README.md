<h1> What is this? </h1>

<p style="padding-top: 16px; font-size: 18px"> It's a package to Search Videos and Stream Video Audio from Youtube. </p>

```js
const Class = require('./Index.js');
const Toolkit = new Class("Your Youtube API Token");
```

<h1 style="padding-top: 16px; font-size: 25px;"> Examples

<p style="padding-top: 16px; font-size: 18px"> Searching on Youtube </p>
</h1>

```js
Toolkit.Search("Search").then((Results) => {
    console.log(Results);
});
```

<p style="padding-top: 16px; font-size: 18px"> Searching Videos on Youtube </p>

```js
Toolkit.Search("Search", {
    Attempts: 10,
    Type: 'video'
}).then((Results) => {
    console.log(Results);
});
```

<p style="padding-top: 16px; font-size: 18px"> Next Page Function </p>

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

<p style="padding-top: 16px; font-size: 18px"> Prev Page Function </p>

```js
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

<p style="padding-top: 16px; font-size: 18px"> Streaming Audio (required: fs) </p>

```js
Toolkit.Audio("Video Link or ID").then((Audio) => {
    Audio.pipe(require('fs').createWriteStream('Audio.mp3'));
});