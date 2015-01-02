/**
 * Created by novy on 02.01.15.
 */
var Youtube = require("youtube-api");
var credentials = require("./credentials.js");
var Q = require("q");
var DELAY_TIME = 5000;

credentials.authenticate();

function createPlaylist(title) {
    var playlistRequest = {
        part: 'snippet,status',
        resource: {
            snippet: {
                title: title
            }
        },
        status: {
            privacyStatus: 'private'
        }
    };

    var deferredPlaylistId = Q.defer();

    Youtube.playlists.insert(
        playlistRequest,
        function(error, response) {
            if (error) {
                console.log(error)
            } else if (!response.id) {
                console.log(response);
                throw new Error('Could not create playlist')
            } else {
                deferredPlaylistId.resolve(response.id);
            }
        }

    );

    return deferredPlaylistId.promise;
}

function addSongToPlaylist(song, playlistId) {
    var details = {
        videoId: song.videoId,
        kind: 'youtube#video'
    };

    //before you start screaming, laughing or anything else, read this:
    //http://www.acnenomor.com/3037813p1/playlistitems-batch-insert-youtube-api-v3
    //this is only a ad-hoc fix to google's api, should be fixed later
    setTimeout(function() {
        Youtube.playlistItems.insert(
            createRequestData(details, playlistId),
            function (error, response) {
                if (error) {
                    console.log(error)
                }
            }
        )
    }, Math.random() * DELAY_TIME);
}

function createRequestData(details, playlistId) {
    return {
        part: 'snippet',
        resource: {
            snippet: {
                playlistId: playlistId,
                resourceId: details
            }
        }
    }
}

module.exports.createPlaylist = createPlaylist;
module.exports.addSongToPlaylist = addSongToPlaylist;
