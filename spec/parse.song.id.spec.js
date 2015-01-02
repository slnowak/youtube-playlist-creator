/**
 * Created by novy on 02.01.15.
 */
var assert = require("assert");

describe('Parsing a song from youtube api response should ', function() {
    beforeEach(function () {
        this.objectUnderTest = require('../app/parse.song.id.js');
    });

    it("create song object with properly artist, title and youtube id", function () {
        var songInfo = {artist: "Dire Straits", title: "Brothers In Arms"};

        var actualSong = this.objectUnderTest.parse(songInfo, fakeResponseWithProperResult);

        assert.deepEqual(
            actualSong,
            {artist: 'Dire Straits', title: 'Brothers In Arms', videoId: 'jhdFe3evXpk'}
        )
    });

    it("return null when there is no result", function () {
        var songInfo = {artist: "Dire Straits", title: "Brothers In Arms"};

        assert.strictEqual(
            this.objectUnderTest.parse(songInfo, fakeResponseWithNoResult),
            null
        )
    });

    it("throw an error given response with more than one item", function () {

        var wrappedParseCall = function() {
            this.objectUnderTest.parse({}, {items: ["a", "b"]});
        };

        assert.throws(wrappedParseCall, Error)
    });
});

var fakeResponseWithProperResult = {
    kind: 'youtube#searchListResponse',
    etag: '"F9iA7pnxqNgrkOutjQAa9F2k8HY/NRbdhwTqEkqTbWWjbh4aJLC91Zk"',
    nextPageToken: 'CAEQAA',
    pageInfo: { totalResults: 233781, resultsPerPage: 1 },
    items: [{
        kind: 'youtube#searchResult',
        etag: '"F9iA7pnxqNgrkOutjQAa9F2k8HY/L4xhcI-AskB28SptoNcEMtcKXKw"',
        id: { kind: 'youtube#video', videoId: 'jhdFe3evXpk' },
        snippet: {
            publishedAt: '2010-02-23T17:30:38.000Z',
            channelId: 'UCc4o6gJBS8VQto3ZR5Z_wcw',
            title: 'Dire Straits - Brothers In Arms',
            description: 'Mark Knopfler releases his eighth solo album, PRIVATEERING, on September 3rd 2012. His first double album, the 20 tracks cover a wide range of locations ...',
            thumbnails: {
                default: { url: 'https://i.ytimg.com/vi/jhdFe3evXpk/default.jpg' },
                medium: { url: 'https://i.ytimg.com/vi/jhdFe3evXpk/mqdefault.jpg' },
                high: { url: 'https://i.ytimg.com/vi/jhdFe3evXpk/hqdefault.jpg' }
            },
            channelTitle: 'DireStraitsVEVO',
            liveBroadcastContent: 'none'
        }
    }]
};

var fakeResponseWithNoResult = {
    kind: 'youtube#searchListResponse',
    etag: '"F9iA7pnxqNgrkOutjQAa9F2k8HY/NRbdhwTqEkqTbWWjbh4aJLC91Zk"',
    nextPageToken: 'CAEQAA',
    pageInfo: { totalResults: 233781, resultsPerPage: 1 },
    items: []
};