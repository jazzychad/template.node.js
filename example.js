/*
 * This is an example webserver which uses templates to serve pages.
 * It requires the "nerve" module to parse/route the URI requests:
 * http://github.com/gjritter/nerve
 *
 * For example, run the server and visit:
 * http://127.0.0.1:8009/hello/Chad
 * http://127.0.0.1:8009/hi/Bob
 */

var sys = require("sys"),
    nerve = require("./nerve"), /* or path to nerve module */
    tmpl = require("./template");

var hi_template = tmpl.tmpl("tmpls/hi.template");
var hi = function(name) {
    return hi_template({name:name});
};

var app = [

	   [get(/^\/hello\/(\w+)$/), function(req, res, name) {
		   /* load the template inline */
		   res.respond(tmpl.tmpl("tmpls/hello.template", {name:name}));
	       }],
	   [get(/^\/hi\/(\w+)$/), function(req, res, name) {
		   /* use the pre-compiled 'hi' template function */
		   res.respond(hi(name));
	       }]
	   
	       
	   ];

nerve.create(app, {session_duration: 10*1000}).serve(8009);