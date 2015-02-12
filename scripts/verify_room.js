/*
 * Verifies room and user creation
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

// :. Helper functions

function debug_query(msg, err, data)
{
    console.log("\n@Query:", msg);
    if(err) {
        console.log("Error:");
        console.log(err);
    } else if (! data || !data.results) {
        console.log("Not found");
    } else {
        console.log("Data:");
        console.log(data.results);
    }
}

/*
 * Optional callback argument to the results
 */
function ref_query(query, ref, callback)
{
    core.emit(query, {
        ref: ref
    }, function(err, data) {
        debug_query(query + " " + ref, err, data);
        if (data && data.results && callback)
            data.results.forEach(callback);
    });
}

// :. Main

console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
console.log("++++Acquire information about user registration+++");
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");

function show_params(res)
{
    if (! res.hasOwnProperty("params") || Object.keys(res.params).length <=0)
    {
        return;
    }

    console.log("Stringified parameters:");
    for (var k in res.params) {
        if (res.params.hasOwnProperty(k)) {
            console.log("|", k, " => ", res.params[k]);
            show_params(res.params[k]);
        }
    }
}

ref_query("getRooms", "informate-chat", show_params);
ref_query("getUsers", "ChatServer", show_params);
