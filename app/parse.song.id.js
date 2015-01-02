/**
 * Created by novy on 02.01.15.
 */

function Song(artist, title, videoId) {
    this.artist = artist;
    this.title = title;
    this.videoId = videoId;
}

module.exports.parse = function(songInfo, youtubeApiResponse) {
    if (!youtubeApiResponse) {
        throw new Error('Got null response body!')
    }

    if (!youtubeApiResponse.items.length) {
        return null
    }

    if (youtubeApiResponse.items.length > 1) {
        throw new Error('Result should contain only one item!')
    }

    var firstAndOnlyResult = youtubeApiResponse.items[0];
    var videoId = firstAndOnlyResult.id.videoId;

    return new Song(songInfo.artist, songInfo.title, videoId)
};