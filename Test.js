const Class = require('./Index.js');
const Toolkit = new Class("Your Youtube API Token");

/* Searching on Youtube */
Toolkit.Search("Search").then((Results) => {
    console.log(Results);
});

/* Searching Videos on Youtube */
Toolkit.Search("Search", {
    Attempts: 10,
    Type: 'video'
}).then((Results) => {
    console.log(Results);
});

/* Youtube Search Next Page */
Toolkit.Search("Search", {
    Attempts: 10,
    Type: 'video'
}).then((Results) => {
    Results["Page"].Next().then((Results) => {
        console.log(Results);
    });
});

/* Youtube Search Prev Page */

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

/* Straming Audio (required: fs) */
/*Toolkit.Audio("Video Link or ID").then((Audio) => {
    Audio.pipe(require('fs').createWriteStream('Audio.mp3'));
});*/