/*
 * template.node.js
 * by Chad Etzel - MIT Licensed
 *
 * Based off of:
 * Simple JavaScript Templating
 * by John Resig - http://ejohn.org/ - MIT Licensed
 * http://ejohn.org/blog/javascript-micro-templating/
 */


var posix = require("posix");

var cache = {};
  
var tmpl  = function (str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/[\t\r\n% ]/.test(str) ?
    cache[str] = cache[str] ||
    // read the template from the file specified
    tmpl(posix.cat(str).wait()) :
    
    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    new Function("obj",
		 "var p=[],print=function(){p.push.apply(p,arguments);};" +
		 
		 // Introduce the data as local variables using with(){}
		 "with(obj){p.push('" +
		 
		 // Convert the template into pure JavaScript
		 str
		 .replace(/[\r\n\t]/g, " ")
		 .split("<%").join("\t")
		 .replace(/((^|%>)[^\t]*)'/g, function($0, $1) { return return $1.replace(/'/g, "\\'") + "\r"; })
                 .replace(/\t=(.*?)%>/g, "',$1,'")
                 .split("\t").join("');")
                 .split("%>").join("p.push('")
                 .split("\r").join("\\'")
                 + "');}return p.join('');");
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
};


/* exports */
exports.tmpl = tmpl;
