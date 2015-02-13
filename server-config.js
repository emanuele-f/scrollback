var serverConfig = {
	global: {
		host: "informateci.org",
		su: {}
	},
	core: {
		name: "scrollback",
		newrelic: {
			name: 'Scrollback informateci'
		}
	},
	env: "production",
	http: {
		host: "informateci.org",
		cookieDomain: ".informateci.org",
		port: 8181,
		home: "public", // the directory containing static files
		time: 60000,
		limit: 30,
		index: "/me" //index URL redirect
	},
   	"leveldb-storage": {
		path: "/data",
		disableQueries: false
	},
	   "browserid-auth": {
		audience: "informateci.org"
	},
};
module.exports = serverConfig;
