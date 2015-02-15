/*
 * A script to authentify vanilla users
 */

var core, config;
var vanilladb;
var parser = require('./groan/groan.js');

module.exports = function(c, conf) {
    core = c;
	config = conf;

    vanilladb = require('./vanilladb.js')(config);

    core.on("init", validateUser, "loader");
};

/*
 * @RAISES
 *      NICKNAME_MISSING        on suggestedNick parameter missing
 *      TRANSIENT_KEY_MISSING   on transient key missing
 *      MALFORMED_TRANSIENT_KEY on bad transient key
 *      VANILLA_DATABASE_ERROR  on mysql database errors
 *      NOT_AUTHORIZED          on bad authentication
 */
function validateUser(action, callback) {
    var parsed;

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

            // Picture loading
            vanilladb.getUserPicture(action.suggestedNick, function (err, pic) {
                if (err)
                    return callback(new Error("VANILLA_DATABASE_ERROR"));

                if (! pic)
                    return callback();

                // Pass the picture
                action.picture = pic;
                if (action.user)
                    // Override entityloader generated picture
                    action.user.picture = pic;

                return callback();
            });
        }
    );
}
