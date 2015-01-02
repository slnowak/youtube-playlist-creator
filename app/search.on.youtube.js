var Youtube = require("youtube-api");
var underscore = require("underscore");
var credentials = require("./credentials.js")

DEFAULT_SEARCH_CRITERIA = {
    part: "snippet",
    type: "video",
    order: "viewCount",
    maxResults: 1
};

Youtube.authenticate({
    type: "oauth",
    token: credentials.AUTHORIZATION_TOKEN
});

function search(songInfo, callbackWhenFound) {
    var query = songInfo.queryRepresentation();
    var searchCriteria = underscore.extend(DEFAULT_SEARCH_CRITERIA, {q: query})

    //fix!
    Youtube.search.list(searchCriteria, function(err, response) {
        if (err) {
            console.log(err)
        } else {
            callbackWhenFound(songInfo, response)
        }
    })
}

module.exports.search = search;