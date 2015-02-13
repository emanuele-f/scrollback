var serverConfig = {
	global: {
		host: "local.scrollback.io",
		su: {}
	},
	core: {
		name: "scrollback",
		newrelic: {
			name: 'Scrollback informateci'
		}
	},
	env: "dev",
	http: {
		host: "local.scrollback.io",
		cookieDomain: ".scrollback.ii",
		port: 8181,
		home: "public", // the directory containing static files
		time: 60000,
		limit: 30,
		index: "/me" //index URL redirect
	},
    "leveldb-storage": {
		path: "/data",
		disableQueries: false
	}
};
module.exports = serverConfig;
