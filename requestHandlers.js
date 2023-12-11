/* requestHandlers */
/* DCS-captions */

"use strict"

var fs = require('fs');
var url = require('url');
var querystring = require("querystring");
var exec = require("child_process").exec;
var execSync = require("child_process").execSync;
var inspect = require('util').inspect;

var _ops = fs.readFileSync ("opSys.txt", "utf8");
var opSys = _ops.substr(0,5);       /*  Win64, MacOS, or Linux (first 5 characters) */
console.log ("opSys is " + opSys);

if (opSys != "Win64")
    {
    var _parentPath = "../";
    var _localPath = "./";
    var _slash = "/";
    }
else
    {
    var _parentPath = "..\\";
    var _localPath = "";
    var _slash = "\\";
    }

/*  GLOBAL variables */
var Version = "2.0.0";          // filled in from ./package.json file
var debugFlags = 0;             // bit-wise flags: 0 = none; 1 = trace_buffer; 2 = console.log; 4 = more detail
var trace_buffer = "";

var _pkg = _localPath + "package.json";
var PKinfo = {};
if (fs.existsSync (_pkg))
    {
    var _PKinfo = fs.readFileSync (_pkg, 'utf8');
    PKinfo = JSON.parse (_PKinfo);
    Version = PKinfo.version;
    }
else
    {
    console.log ("FATAL ERROR: package.json file not found!");
    process.exit(1);
    }

function favicon (response, request)
    {
    if (debugFlags & 2)
        console.log("Request handler 'favicon'.");
    var _fn = _localPath + 'favicon.ico';
    fs.readFile (_fn, null, function (err,data)
        {
        if (err)
            {
            if (debugFlags & 2)
                console.log ("favicon.ico not found.");
            response.writeHead(404 ,{'Content-Type': 'text/plain'});
            response.write('404 favicon Not Found\n');
            response.write (err);
            response.end();
            }
        else
            {
            response.writeHead(200, {"Content-Type": "image/x-icon"});
            response.write(data);
            response.end();
            }
        });
    }

function init (response, request)
    {
    if (debugFlags & 2)
        console.log ("Request handler 'init'.");
    // verify Google Chrome browser
    if (true)   // I haven't figured out how to determine if Chrome browser
        {
        // switch to DCS-captions screen
        response.writeHead(302, {'Location': 'http://localhost:50200/DCS-captions.html'});
        response.end();
        }
    else
        {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("This program requires a Google Chrome browser.\n");
        response.end();
        }
    }   // end init

function script (response, request)
    {
    if (debugFlags & 2)
        console.log("Request handler 'script'.");
    var _fn = _localPath + 'captions.js';         // get the real script file
    var data = fs.readFileSync (_fn, 'utf8');
    response.writeHead(200, {"Content-Type": "text/javascript"});
    response.write(data);
    response.end();
    }

function style (response, request)
    {
    if (debugFlags & 2)
        console.log("Request handler 'style'.");
    var _fn = _localPath + 'dcs-captions.css';       // get the real css file
    var data = fs.readFileSync (_fn, 'utf8');
    response.writeHead(200, {"Content-Type": "text/css"});
    response.write(data);
    response.end();
    }

function trace (response, request)
    {
    if (debugFlags & 2)
        console.log("Request handler 'trace'.");
    response.writeHead (200, {"Content-Type": "text/html"});
    response.write ("<!DOCTYPE html>\n");
    response.write ("<html>\n");
    response.write ("<head>\n");
    response.write ("<meta charset=\"UTF-8\">\n");
    response.write ("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n");
    response.write ("<meta http-equiv=\"Cache-Control\" content=\"no-cache, no-store, must-revalidate\">\n");
    response.write ("<meta http-equiv=\"Pragma\" content=\"no-cache\">\n");
    response.write ("<meta http-equiv=\"Expires\" content=\"0\">\n");
    response.write ("<meta http-equiv=\"refresh\" content=\"120\">\n");    // auto refresh (2 min)
    response.write ("<title>DCS trace buffer</title>\n");
    response.write ('<link rel="stylesheet" type="text/css" href="style">\n');
    response.write ("</head>\n");
    response.write ("<body>\n");
    response.write ("<h3>Trace buffer</h3>\n");
    var now = new Date();
    var _ctime = now.toString();
    response.write('<p>Updated ' + _ctime + "</p>\n");
    response.write (trace_buffer);
    response.write ("<br>\n");
    response.write ("</body>\n");
    response.write ("</html>\n");
    response.end ();
    }

exports.favicon = favicon;
exports.init = init;
exports.script = script;
exports.style = style;
exports.trace = trace;

