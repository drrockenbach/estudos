var app = require('./config/express')();

var rotasProdutos = require('./app/routes/produtos')(app);

app.get('/', function(req, res) {

    res.send('Home');

});

app.listen(3000, function() {
    console.log('servidor rodando');
});