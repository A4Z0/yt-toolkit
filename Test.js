const Class = require('./Index.js');
const Toolkit = new Class("Youtube API Key");

Toolkit.Search("Any Search", (Results) => {
    Results["Page"].Next((Results) => {
        console.log(Results);
    });
});