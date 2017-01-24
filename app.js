'use strict';
const Hapi = require('hapi');
const fs = require('fs');

const server = new Hapi.Server();

//var app = require('./vue-example')()
//var renderer = require('vue-server-renderer').createRenderer()

var app =  fs.readFileSync('./vue-example-server.js', 'utf8')
var renderer = require('vue-server-renderer').createBundleRenderer(app)
var layout = fs.readFileSync('./index.html', 'utf8')

server.connection({ 
    host: 'localhost', 
    port: 8083 
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
});

server.route({
    method: 'GET',
    path: '/vue-example.js',
    handler: {
        file: 'vue-example.js'
    }
});

server.route({
    method: 'GET',
    path:'/{path*}', 
    handler: function (request, reply) {
        //renderer.renderToString( app , function (error, html) {
        renderer.renderToString( { url: request.url.path } , function (error, html) {
            if (error) {
                console.log( 'error' , error )
                throw error
            }
            reply( layout.replace('<div id="app"></div>' , html ) )
            //reply.view('index')
        })
    }
});

server.start((error) => {
    if (error) {
        console.log( 'error' , error )
        throw error;
    }
    console.log('Server running at:', server.info.uri);
});


