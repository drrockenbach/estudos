

module.exports = function(app) {
    app.get('/produtos', function(req, res) {
        // res.send('listagem produtos');

        var connection = app.infra.connectionFactory();
        var produtosBanco = app.infra.produtosBanco(connection);

        produtosBanco.lista(function(err, result) {
                // console.log(err);
                // res.send(result);
                res.render('produtos/lista', {lista: result});
            }
        );

        connection.end();
    

    })
};