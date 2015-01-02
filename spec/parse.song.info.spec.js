/**
 * Created by novy on 02.01.15.
 */

var assert = require("assert");


describe('Parsing a song from csv line should ', function() {
    beforeEach(function () {
        this.songParser = require('../app/parse.song.info.js');
    });

    it("parse artist and title properly", function() {
        var lineToParse = "Dire Straits; Brothers In Arms";

        var songInfo = this.songParser.parse(lineToParse);

        assert.deepEqual(
            songInfo,
            {'artist': 'Dire Straits', 'title': 'Brothers In Arms'}
        );
    });

    it("omit whitespaces after parsing", function () {
        var lineToParse = "  Dire Straits" +
            ";        \n\n\n   Brothers In Arms  ";

        var songInfo = this.songParser.parse(lineToParse);

        assert.deepEqual(
            songInfo,
            {'artist': 'Dire Straits', 'title': 'Brothers In Arms'}
        );
    });

    it("throw an error given empty artist", function () {
        var lineToParse = "   ; Brothers In Arms";

        var wrappedParseCall = function() {
            this.songParser.parse(lineToParse);
        };

        assert.throws(wrappedParseCall, Error)
    });

    it("throw an error given empty title", function () {
        var lineToParse = "  Artist ; ";

        var wrappedParseCall = function() {
            this.songParser.parse(lineToParse);
        };

        assert.throws(wrappedParseCall, Error)
    });
});