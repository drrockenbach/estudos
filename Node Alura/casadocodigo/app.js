var app = require('./config/express')();

// não precisa mais carregar as rotas,pois já está sendo tudo carregado dentro do express.js
//var rotasProdutos = require('./app/routes/produtos')(app);

app.get('/', function(req, res) {

    res.send('Home');

});

app.listen(3000, function() {
    console.log('servidor rodando');
});