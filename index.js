/* index.js - main function */
/* DCS-captions */

"use strict"

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle['/favicon.ico'] = requestHandlers.favicon;
handle["/init"] = requestHandlers.init;
handle["/script"] = requestHandlers.script;
handle["/style"] = requestHandlers.style;
handle["/trace"] = requestHandlers.trace;

// console.log ("index");
server.start (router.route, handle);
