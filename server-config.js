var serverConfig = {
	global: {
		host: "local.scrollback.io",
		su: {}
	},
	core: {
		name: "scrollback",
		newrelic: {
			name: 'Scrollback Local'
		}
	},
	env: "dev",
	http: {
		host: "local.scrollback.io",
		cookieDomain: ".scrollback.io",
		port: 8080,
		home: "public", // the directory containing static files
		time: 60000,
		limit: 30,
		index: "/me" //index URL redirect
	},
	email: {
		from: "scrollback@scrollback.io",
		redisDB: 7
	},
    "leveldb-storage": {
		path: "/data",
		disableQueries: false
	}
};
module.exports = serverConfig;
