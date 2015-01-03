/**
 * Created by novy on 02.01.15.
 */
var Youtube = require("youtube-api");
var credentials = require("./credentials.js");
var Q = require("q");

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

    var def = Q.defer();

    Youtube.playlistItems.insert(
        createRequestData(details, playlistId),
        function (error, response) {
            if (error) {
                console.log(error)
            } else {
                def.resolve(response)
            }
        }
    );

    return def.promise;
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
