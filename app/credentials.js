/**
 * Created by novy on 02.01.15.
 */
var Youtube = require("youtube-api");

CLIENT_ID = 'cid';
AUTHORIZATION_TOKEN = 'atok';
API_KEY = 'apik';


function authenticate() {
    Youtube.authenticate({
        type: "oauth",
        token: AUTHORIZATION_TOKEN
    });
}

module.exports.CLIENT_ID = CLIENT_ID;
module.exports.AUTHORIZATION_TOKEN = AUTHORIZATION_TOKEN;
module.exports.API_KEY = API_KEY;
module.exports.authenticate = authenticate;
