/**
 * Created by novy on 02.01.15.
 */

function SongInfo(artist, title) {
  return {
    'artist': artist,
    'title': title
  }
}

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

  return SongInfo(trimmedArtist, trimmedTitle)
}

module.exports.parse = parse;