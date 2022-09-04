export class Movie{
    /* id : Number;
    url : String;
    name : String;
    season : Number;
    number : Number;
    type : String;
    airdate : String;
    airtime : String;
    airstamp : String;
    runtime: Number;
    rating : {
        average: null | number;
    };
    image: {
        medium: String;
        original: String;
    } | null;
    summary: null
    _links: {
        self: {
            href:  String;
        }
    }; */
    _embedded : {
        show: {
            id: Number;
            url:  String;
            name:  String;
            type:  String;
            language:  String;
            genres: [String],
            status:  String;
            runtime: Number;
            averageRuntime: Number;
            premiered:  String;
            ended: null,
            officialSite:  String;
            schedule: {
                time:  String;
                days: [String];
            };
            rating: {
                average: null
            };
            weight: Number;
            network: {
                id: Number;
                name: String;
                country: {
                    name: String;
                    code: String;
                    timezone: String;
                };
                officialSite: null;
            },
            webChannel: {
                country: {
                    name : String;
                }
            } | null;
            dvdCountry: null;
            externals: {
                tvrage: String;
                thetvdb: String;
                imdb: String;
            };
            image: {
                medium: String;
                original: String;
            };
            summary:  String;
            updated: Number;
            _links: {
                self: {
                    href: String;
                };
                previousepisode: {
                    href: String;
                };
                nextepisode: {
                    href: String;
                };
            }
        }
    }
}