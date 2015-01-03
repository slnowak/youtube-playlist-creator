var Youtube = require("youtube-api");
var underscore = require("underscore");
var credentials = require("./credentials.js")

DEFAULT_SEARCH_CRITERIA = {
    part: "snippet",
    type: "video",
    order: "viewCount",
    maxResults: 1
};

credentials.authenticate();


function search(songInfo, callbackWhenFound) {
    var query = songInfo.queryRepresentation();
    var searchCriteria = underscore.extend(DEFAULT_SEARCH_CRITERIA, {q: query})

    Youtube.search.list(searchCriteria, callbackWhenFound);
}

module.exports.search = search;