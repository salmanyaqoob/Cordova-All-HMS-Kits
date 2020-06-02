var path = require('path');

var Patcher = require('./utils/Patcher');
var browserSyncServer = require('./utils/browserSyncServer');

var platforms = ['android', 'ios', 'browser'];

function parseOptions(opts)
{
    var result = {};
    opts = opts || [];
    opts.forEach(function(opt) {
        var parts = opt.split(/=/);
        result[parts[0].replace(/^-+/, '')] = parts[1] || true;
    });
    return result;
}

/**
 * This is the main page.
 *
 * @param context
 */
function renderServeMainPage(context)
{
	var content = '<!doctype html><html>';
	content += '<head><meta charset=utf-8><title>' + context.opts.plugin.id + '</title></head>';
	content += '<body>';
	content += '<h1>' + context.opts.plugin.id + '</h1>';
	content += '<div><strong>Project Root:</strong> ' + context.opts.projectRoot + '</div>';
    content += '<h2>Platforms</h2>';
    content += '<ul style="font-size: 18px">';

    platforms.forEach(function(item)
    {
    	content += '<li>';
    	content += '<a href="' + item + '/www/index.html">' + item + '</a>';
    	content += '</li>';
    });

    content += '</ul>';
    content += '</body>';
    content += '</html>';

    return content;
}

module.exports = function(context)
{
	var options = context.hook === "before_serve" ? parseOptions(process.argv.slice(3)) : context.opts.options;
	if (typeof options['live-reload'] === 'undefined')
    {
        return;
    }

    options.index = typeof options.index !== 'undefined' ? options.index : 'index.html';

	var enableCors = typeof options['enable-cors'] !== 'undefined';

	var ignoreOptions = {};
	if (typeof options.ignore !== 'undefined')
	{
	    ignoreOptions = {ignored: options.ignore};
	}
    
	return new Promise(function(resolve)
	{
	    var patcher = new Patcher(context.opts.projectRoot, platforms);
	    patcher.prepatch();
	    var changesBuffer = [];
	    var changesTimeout;
	    var serversFromCallback=[];
	    var bs = browserSyncServer(function(defaults)
	    {
	        if (enableCors)
	        {
	            defaults.middleware = function (req, res, next)
	            {
	              res.setHeader('Access-Control-Allow-Origin', '*');
	              next();
	            };
	        }
	        defaults.files.push(
	        {
	            match: ['www/**/*.*'],
	            fn: function(event, file) {
	                if (event === 'change') {
	                    changesBuffer.push(file);
	                    if(changesTimeout){
	                      clearTimeout(changesTimeout);
	                    }
	                    changesTimeout = setTimeout(function(){
	                      context.cordova.prepare().then(function() {
	                          patcher.addCSP({
	                              index: options.index,
	                              servers: serversFromCallback, //need this for building proper CSP
	                          });
	                          console.info(changesBuffer);
	                          bs.reload(changesBuffer);
	                          changesBuffer = [];
	                      });
	                    }, 200);
	                }
	            },
	            options: ignoreOptions
	        });

	        defaults.server = 
	        {
	            baseDir: context.opts.projectRoot,
	            routes: {},
	            middleware: [
				    function (req, res, next)
				    {
				    	// Main page
				    	if (req.url === "/")
				    	{
				        	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
				        	res.write(renderServeMainPage(context));
	  						return res.end();
				    	}
	  					return next();
				    }
				]
	        };

	        platforms.forEach(function(platform)
	        {
	            defaults.server.routes["/" + platform + "/www"] = path.join(context.opts.projectRoot, patcher.getWWWFolder(platform));
	        });

	        // Merge user parameters with defaults
	        for (var opt in options)
	        {
	        	defaults[opt] = options[opt];
	        }

	        return defaults;
	    },
	    function(err, servers)
	    {
	        serversFromCallback=servers;
	        patcher.patch(
	        {
	            servers: servers,
	            index: options.index
	        });

	        /**
	         * This will prevent cordova static page server from running since
	         * promise will never send back any response.
	         */
	        if (context.hook !== "before_serve")
	        {
	        	resolve();
	        }
	    });
	});
};
