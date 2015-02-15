/*
 * Interact with mysql vanilla database
 */

var config;
var log = require('../lib/logger.js');
var mysql = require('mysql');
var connection = false;
var connection_config;

module.exports = function(conf) {
	config = conf;

    connection_config = {
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.db
    };

    return {
        getUserAttributes: getUserAttributes,
        getUserPicture: getUserPicture
    };
};

/* PROTECTED */

function connect(callback) {
    connection = mysql.createConnection(connection_config);

    connection.on('close', function(err) {
        if (err) {
            log.e("mysql database error:", err.stack);
            connection = false;
        }
    });

    connection.on('error', function (err) {
        log.e("mysql database error:", err.stack);
        connection = false;
    });

    connection.connect(function(err) {
        if (err) {
            log.e("Cannot connect to vanilla database:", err.stack);
            connection = false;
        }
        return callback(err);
    });
}

function check_connection(callback) {
    if (! connection)
        return connect(callback);
    return callback(false);
}

/* PUBLIC */

function getUserAttributes(username, callback) {
    var query;

    check_connection(function(err) {
        if (err)
            return callback(err, null);

        query = "SELECT Attributes FROM GDN_User WHERE Username='" + username + "';";
        connection.query(query, function(err, rows) {
            if (err) {
                if (connection)
                    log.w("Vanilla query error:", err.stack);
                return callback(err, null);
            }

            if(rows.length != 1)
                return callback(false, false);

            return callback(false, rows[0].Attributes);
        });
    });
}

function getUserPicture(username, callback) {
    var query;

    check_connection(function(err) {
        if (err)
            return callback(err, null);

        query = "SELECT Photo FROM GDN_User WHERE Username='" + username + "';";
        connection.query(query, function(err, rows) {
            if (err) {
                if (connection)
                    log.w("Vanilla query error:", err.stack);
                return callback(err, null);
            }

            if(rows.length != 1)
                return callback(false, false);

            return callback(false, rows[0].Photo);
        });
    });
}
