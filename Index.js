const String = require('querystring');
const YTDL = require('ytdl-core');
const Axios = require('axios');

module.exports = class Youtube {
    constructor(Key) {
        this.Key = Key;
    };

    Search(Search, Callback, Options = { Attempts: 0, Type: "", Part: "", Token: ""}) {
        const Parameters = {
            q: Search,
            key: this.Key,
            type: Options.Type || null,
            part: Options.Part || 'snippet',
            maxResults: Options.Attempts || 10,
            pageToken: Options.Token || null,
        };

        function JSON(ID, Link, Item) {
            return {
                "Video": {
                "ID": ID,
                "URL": Link,
                "Title": Item.snippet.title,
                "Date": Item.snippet.publishedAt,
                "Description": Item.snippet.description,
                "Thumbnail": {
                    "Default": () => {
                        return Item.snippet.thumbnails["default"];
                    },
                    "Medium": () => {
                        return Item.snippet.thumbnails["medium"];
                    },
                    "High": () => {
                        return Item.snippet.thumbnails["high"];
                    },
                },
                "Channel": {
                    "ID": Item.snippet.channelId,
                    "Name": Item.snippet.channelTitle,
                    },
                },
            };
        };

        try {
            Axios.get('https://www.googleapis.com/youtube/v3/search?' + String.stringify(Parameters)).then(async (Response) => {
                const Data = Response.data;

                const Results = Data.items.map((Item) => {
                    var Link = null;
                    var ID = null;
        
                    if(Item.id.kind == "youtube#channel") {
                        Link = 'https://www.youtube.com/channel/' + Item.id.channelId;
                        ID = Item.id.channelId;
                    }else if(Item.id.kind == "youtube#playlist") {
                        Link = 'https://www.youtube.com/playlist?list=' + Item.id.playlistId
                        ID = Item.id.playlistId
                    }else{
                        Link = 'https://www.youtube.com/watch?v=' + Item.id.videoId;
                        ID = Item.id.videoId;
                    };

                    return JSON(ID, Link, Item);
                });

                return new Promise(async (Resolve, Reject) => {
                    try {
                        Resolve({Results, Data});
                    }catch(Error) {
                        Reject(Error);
                    };
                });
            }).then((Object) => {
                const Data = Object.Data;
                const Results = Object.Results;

                Results["Page"] = {};

                if(Data.nextPageToken) {
                    Results["Page"]["Next"] = (Callback) => {
                        Options["Token"] = Data.nextPageToken;

                        return this.Search(Search, Callback, Options);  
                    };
                };

                if(Data.prevPageToken) {
                    Results["Page"]["Prev"] = (Callback) => {
                        Options["Token"] = Data.prevPageToken;

                        return this.Search(Search, Callback, Options);  
                    };
                };

                Callback(Results);
            }).catch((Err) => {
                throw new Error(Err);
            });
        }catch(Err) {
            throw new Error(Err);
        };
    };

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