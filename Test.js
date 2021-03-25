const YTK = require('./Index.js');
const Query = new YTK.Query("Your Youtube API Key");

Query.Search("Any Search", (Results) => {
    console.log(Results);
});

Query.Search("Any Search", (Results) => {
    Results["Page"].Next((Results) => {
        console.log(Results);
    });
});

Query.Search("Any Search", (Results) => {
    Results["Page"].Next((Results) => {
        Results["Page"].Prev((Results) => {
            console.log(Results);
        });
    });
});

/*const Downloader = new YTK.Downloader();

Downloader.Video('Any Youtube Video Link or ID', (Stream) => {
    Stream.pipe(require('fs').createWriteStream('File.'+Stream["format"]));
}, {
    Video: false,
});

Downloader.Playlist("Any Youtube Playlist Link or ID", (Array) => {
    Array.forEach((Stream) => {
        Stream.pipe(require('fs').createWriteStream(Stream["ID"]+"."+Stream["format"]));
    });
}, {
    Video: false,
});*/