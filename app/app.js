var songInfoParser = require('./parse.song.info.js');
var songParser = require('./parse.song.id.js');
var youtube = require('./search.on.youtube');
var playlist = require('./add.to.playlist.js');
var fs = require('fs');
var Q = require('q');

function readCSV(filename) {
    return fs.readFileSync(filename)
        .toString()
        .split('\n')
}

filename = './app/input';
var arguments = process.argv.slice(2);
if (arguments.length) {
    filename = arguments[0]
}

var songInputLines = readCSV(filename);
var songsInfo = songInputLines.map(function(line) {
   return songInfoParser.parse(line)
});

playlist.createPlaylist('playlist')
    .then(function(playlistId) {

        songsInfo.reduce(function (accumulatedPremise, songInfo) {
            return accumulatedPremise.then(function (response) {
                return Q.ninvoke(youtube, 'search', songInfo)
                    .then(function (response) {
                        var song = songParser.parse(songInfo, response[0]);
                        if (song !== null) {
                            return Q.ninvoke(playlist, 'addSongToPlaylist', song, playlistId)
                        }
                        return Q()
                    }, function(error) {
                        throw new Error()
                    });
            })}, Q());

        });




