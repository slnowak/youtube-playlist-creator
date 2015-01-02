var songInfoParser = require('./parse.song.info.js');
var songParser = require('./parse.song.id.js');
var youtube = require('./search.on.youtube');
var playlist = require('./add.to.playlist.js');
var fs = require('fs');

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
        songsInfo.forEach(function(songInfo) {
        youtube.search(songInfo, function(songInfo, resp) {
            var song = songParser.parse(songInfo, resp);
            if (song !== null) {
                playlist.addSongToPlaylist(song, playlistId)
            }
        })
    });

});


