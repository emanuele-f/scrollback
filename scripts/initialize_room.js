/*
 \\\ wami            ///
 ///     05-Feb-2015 \\\
 *
 * A script to register rooms on the leveldb database.
 * See /leveldb-storage/leveldb-test.js for more examples.
 *
 * run:
 *  nodejs create_room.js
 *
 * Note that:
 *  1) Scrollback server must be down
 *  2) You may need root privileges to update database
*/

// :. Inizialization
var config = require("../server-config-defaults.js");
var core = new(require('ebus'))();
var generate = require("../lib/generate.js");
var crypto = require('crypto');
config["leveldb-storage"].path = "../leveldb-storage/data";
config["leveldb-storage"].global = config.global;
config["leveldb-storage"].disableQueries = false;
require("../leveldb-storage/leveldb-storage.js")(core, config["leveldb-storage"]);

// :. Begin
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
console.log("+++++++++++++++Room creation script+++++++++++++++");
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");

function generatePick(id) {
	return 'https://gravatar.com/avatar/' + crypto.createHash('md5').update(id).digest('hex') + '/?d=identicon&s=48';
}

/*
 * Add a new room to the database.
 *
 * @PARAMS
 *  room : room name
 *  user : id of the room administrator
 *  description : room description
 *      default: ""
 *  id : room id
 *      default: generate random
 */
function createRoom(room, user, description, id)
{
    if (! description) description = "";
    if (! id) id = generate.uid();

    params = {
        id: id,
        type: "room",
        room: {
            id: room,
            description: description,
            type: "room",
            params: {
                irc: {
                    server: "irc.freenode.net",
                    channel: "#informate-chat",
                    enabled: true,
                    pending: false
                }
            }
        },
        user :  {
            id: user,
        }
    }

    core.emit("room", params,
        function(err) {
            if (err)
                console.log(err.toString());
            else
                console.log("* Room", room, "created successfully");
    });
}

/*
 * Add a new user to the database.
 *
 * @PARAMS
 *  user : user name
 *  email : user email
 *  id : user id
 *      default: generate random
 */
function createUser(user, email, id)
{
    if (! id) id = generate.uid();

    core.emit("user", {
        id: id,
        type: "user",
        user: {
            id: user,
            description: "",
            type: "user",
            picture: generatePick(email),
            identities: ["mailto:" + email],
            params: {}
        }
    }, function(err) {
        if(err)
            console.log(err.toString());
        else
            console.log("* User", user, "created successfully");
    });
}

// :. Create user admin
createUser("ChatServer", "email_here");

// :. Create informate-chat room
createRoom("informate-chat", "ChatServer", "La chat degli studenti informatici pisani");
