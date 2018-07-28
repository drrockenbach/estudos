var app = require('express')().set('view engine', 'ejs').set('views','./app/views');

module.exports = function() {
   return app;
}