var express = require('express')
var load = require('express-load')
var bodyParser = require('body-parser');

module.exports = function() {

    var app = express();
    app.set('view engine', 'ejs').set('views','./app/views');

    app.use(bodyParser.urlencoded({extended: true}));

    // tudo que estiver dentro da pasta routes, já vai ser carregado dentr o de app
    // {cwd: 'app'} informa a partir de qual pasta deve procurar a pasta routes e infra. Não é obrigatorio,
    // mas se não informar procura em todo projeto.
    load('routes', {cwd: 'app'})
    // Vai carregar tudo dentro de infra
    .then('infra')
    .into(app);

    return app;
}