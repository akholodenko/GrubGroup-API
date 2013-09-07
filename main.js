// constants
global.MODULE_PATH = 'grubgroup/';
//global.MODULE_CONTROLLER_PATH = 'usermanager/controllers/';

// 3rd party modules
var _http = require("http");
var _und = require('underscore');
var _url = require('url');

// GrubGroup defined modules
var _um_utils = require(MODULE_PATH + 'utils');

/**	HTTP server instance to respond to API requests	*/
var server = _http.createServer(function(request, response) {
	if(_um_utils.ignore_favicon(request, response)) return;	// control for favicon in request
/*
	// parse data input
	var path_url = _url.parse(request.url, true).pathname;
	var path_object = _und.compact(path_url.split('/'));
	var controller = _und.first(path_object);
	var action = _und.first(_und.rest(path_object));
	console.log('controller: ' + controller);
	console.log('action: ' + action);
*/

	var yelp = require("yelp").createClient({
		consumer_key: "PZSwO6nRWsMXCqX-YdUEJA",
		consumer_secret: "4ptFi4GlR-A-nV-DJ323f7mEDKA",
		token: "nZWejbCEiOCypu7C8f8XvsbdLxv-Uh_G",
		token_secret: "f4gAU_UTewoTJvHllTDJ8Hi6g-k"
	});

	// write headers
	response.writeHead(200, {"Content-Type": "application/json"});

	// See http://www.yelp.com/developers/documentation/v2/search_api
	yelp.search({term: "", ll: "37.77951,-122.39071", radius_filter: "1600", category_filter: "restaurants"}, function(error, data) {
		//console.log(error);
		response.write(JSON.stringify(data));
		response.end();
	});
});

server.listen(80);
console.log("Server is listening");