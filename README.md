<div align="center">
    <h1> Y-TK </h1>
    <a href="https://www.npmjs.com/package/yt-toolkit"><img src="https://img.shields.io/npm/v/yt-toolkit.svg?maxAge=3600"></a>
    <a href="https://www.npmjs.com/package/yt-toolkit"><img src="https://img.shields.io/npm/dt/yt-toolkit.svg?maxAge=3600"></a>
    <a href="https://david-dm.org/A4Z0/yt-toolkit"><img src="https://img.shields.io/david/A4Z0/yt-toolkit.svg?maxAge=3600"/>
    </a>
</div>

<div align="center">
    <a href="https://nodei.co/npm/yt-toolkit/">
    <img src="https://nodei.co/npm/yt-toolkit.png?downloads=true&stars=true">
    </a>
</div>

## Contents
- [About](#about)
- [Examples](#examples)

## About

<a href="https://nodei.co/npm/yt-toolkit/" style="color: #EC4F47;">Y-TK</a> is a module that helps to use youtube tools. 

- This module is not affiliated with youtube.

<div style="padding: 8px;"></div>

## Examples

```js
const YTK = require('yt-toolkit');
const Query = new YTK.Query("Your Youtube API Key");

Query.Search("Any Search", (Results) => {
    console.log(Results);
});
```

<h3 style="padding-left: 8px;"> - Next Page Example </h3>

```js
Query.Search("Any Search", (Results) => {
    Results["Page"].Next((Results) => {
        console.log(Results);
    });
});
```

<h3 style="padding-left: 8px;"> - Prev Page Example </h3>

```js
Query.Search("Any Search", (Results) => {
    Results["Page"].Next((Results) => {
        Results["Page"].Prev((Results) => {
            console.log(Results);
        };
    });
});
```

<h3 style="padding-left: 8px;"> - Streaming Example </h3>

```js
const Downloader = new YTK.Downloader();

Downloader.Stream('Any Youtube Video Link or ID', (Stream) => {
    Stream.pipe(require('fs').createWriteStream('File.'+Stream["format"]));
}, {
    Video: false,
});
```