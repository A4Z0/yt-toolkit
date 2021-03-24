const YTK = require('./Index.js');
const Query = new YTK.Query("Your Youtube API Key");

Query.Search("Any Search", (Results) => {
    Results["Page"].Next((Results) => {
        console.log(Results);
    });
});

const Downloader = new YTK.Downloader();

Downloader.Stream("Any Video Link or ID", (Stream) => {
    console.log(Stream);
});