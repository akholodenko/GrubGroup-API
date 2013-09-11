// constants
global.MODULE_PATH = 'grubgroup/';
global.MODULE_CONTROLLER_PATH = 'controllers/';

// 3rd party modules
var _http = require("http");
var _und = require('underscore');
var _url = require('url');
var _async = require('async');

// GrubGroup defined modules
var _um_utils = require(MODULE_PATH + 'utils');

/**	HTTP server instance to respond to API requests	*/
var server = _http.createServer(function(request, response) {
	if(_um_utils.ignore_favicon(request, response)) return;	// control for favicon in request

	// parse data input
	var query = _url.parse(request.url, true).query;
	var callback = (query.callback != undefined) ? query.callback : null;
	var latitude = (query.lat != undefined) ? query.lat : '37.77951';
	var longitude = (query.lon != undefined) ? query.lon : '-122.39071';
	var radius = (query.radius != undefined) ? query.radius : '1250';

	// determine routings
	var path_url = _url.parse(request.url, true).pathname;
	var path_object = _und.compact(path_url.split('/'));
	var controller = _und.first(path_object);
	var action = _und.first(_und.rest(path_object));

	controller = (controller == undefined) ? 'yelp' : controller;

	console.log('controller: ' + controller);
	console.log('action: ' + action);

	var input = new Object();
	input.callback = callback;
	input.latitude = latitude;
	input.longitude = longitude;
	input.radius = radius;

	// determine routing / controller logic
	switch(controller) {
		case 'citygrid':
			var citygrid_instance = require(MODULE_CONTROLLER_PATH + 'citygrid.controller').createClient(response);
			citygrid_instance.get_sugguestion(input);
			break;
		case 'yelp':
			var yelp_instance = require(MODULE_CONTROLLER_PATH + 'yelp.controller').createClient(response);
			yelp_instance.get_sugguestion(input);
			break;
		default:
			break;
	}


});

server.listen(80);
console.log("Server is listening");