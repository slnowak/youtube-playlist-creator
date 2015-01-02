/**
 * Created by novy on 02.01.15.
 */

function SongInfo(artist, title) {

  this.artist = artist;
  this.title = title;

}

SongInfo.prototype.queryRepresentation = function() {
  return this.artist + ' ' + this.title
};

function parse(line) {
  var splitLine = line.split(";");
  var trimmedArtist = splitLine[0].trim();
  var trimmedTitle = splitLine[1].trim();

  if (!trimmedArtist) {
    throw new Error('Artist name cannot be empty!')
  }

  if (!trimmedTitle) {
    throw new Error('Title cannot be empty!')
  }

  return new SongInfo(trimmedArtist, trimmedTitle)
}

module.exports.parse = parse;