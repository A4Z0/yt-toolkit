const YTDL = require('ytdl-core');

module.exports = class Downloader {
    Stream(ID, Callback, Options = { Filter: "", Quality: "", Video: true}) {

        var Parameters = {
            quality: Options.Quality || null,
            filter: Options.Filter == "audioonly" && Video == true ? null : Options.Filter || null,
        };

        if(Options.Video == false) {
            Parameters = {
                filter: 'audioonly',
            };
        };

        if(!ID.includes("https://www.youtube.com/watch?v=")) {
            ID = "https://www.youtube.com/watch?v=" + ID;
        };

        try {
            const Stream = YTDL(ID, Parameters);

            Stream["format"] = Options.Video == false ? 'mp3' : (Parameters.filter != null ? Parameters.filter : 'mp4');

            Callback(Stream);
        }catch(Err) {
            throw new Error(Err);
        };
    };
};