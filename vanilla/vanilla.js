/*
 * A script to authentify vanilla users
 */

var config;
var vanilladb;
var log = require('../lib/logger.js');
var parser = require('./groan/groan.js');

module.exports = function(c, conf) {
    core = c;
	config = conf;

    vanilladb = require('./vanilladb.js')(config);

    core.on("init", validateUser, "loader");
}

/*
 * @RAISES
 *      NICKNAME_MISSING        on suggestedNick parameter missing
 *      TRANSIENT_KEY_MISSING   on transient key missing
 *      MALFORMED_TRANSIENT_KEY on bad transient key
 *      VANILLA_DATABASE_ERROR
 *      NOT_AUTHORIZED
 */
function validateUser(action, callback) {
    var parsed;

    log.d("action:", action);

    // missing check
    if (! action.suggestedNick)
        return callback(new Error("NICKNAME_MISSING"));
    if (! action.tkey)
        return callback(new Error("TRANSIENT_KEY_MISSING"));

    // transient key validation
    if (action.tkey.length !=12 || ! action.tkey.match(/^[A-Z0-9]+$/))
        return callback(new Error("MALFORMED_TRANSIENT_KEY"));

    vanilladb.getUserAttributes(action.suggestedNick, function (err, attribs) {
            if (err || ! attribs)
                return callback(new Error("VANILLA_DATABASE_ERROR"));

            parsed = parser(attribs);
            if (! parsed || !parsed.TransientKey || action.tkey !== parsed.TransientKey)
                return callback(new Error("NOT_AUTHORIZED"));

            return callback();
        }
    );
}
