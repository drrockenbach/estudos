var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/produtos', function(req, res) {

    // res.send('listagem produtos');

    res.render('produtos/lista');

});

app.get('/', function(req, res) {

    res.send('Home');

});

app.listen(3000, function() {
    console.log('servidor rodando');
});