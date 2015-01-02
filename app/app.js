var songInfoParser = require('./parse.song.info.js');
var songParser = require('./parse.song.id.js');
var youtube = require('./search.on.youtube');
var fs = require('fs');

function readCSV(filename) {
    return fs.readFileSync(filename)
        .toString()
        .split('\n')
}

filename = './app/input';
//todo: at least read file as console parameter...
//var arguments = process.argv.slice(2);

var songInputLines = readCSV(filename);
var songsInfo = songInputLines.map(function(line) {
   return songInfoParser.parse(line)
});

songsInfo.forEach(function(songInfo) {
   youtube.search(songInfo, function(songInfo, resp) {
       var song = songParser.parse(songInfo, resp);
       console.log(song)
   })
});