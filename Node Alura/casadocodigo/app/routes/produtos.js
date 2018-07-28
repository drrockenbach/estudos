

module.exports = function(app) {
    app.get('/produtos', function(req, res) {
        // res.send('listagem produtos');

        var connection = app.infra.connectionFactory();
        // var produtosBanco = app.infra.ProdutosDAO(connection);
        // A atribuição acima, sem new, torna o 'this' dentro do objeto global. Sendo assim, caso tenhamos
        // a situação abaixo, poderemos ter problemas.
        // EX: uma segunda instancia var produtosBancos2 = app.infra.ProdutosDAO(connection, 'valor 2');
        // Considerando que produtos banco receba um valor, e dentro de produtos banco tenha this.valor = valor
        // onde valor é o passado por parâmetro, as duas instancias vão ter o 'valor 2';
        // Para resolver isso se utiliza o new para receber uma nova instância, conforme abaixo.


        var produtosBanco = new app.infra.ProdutosDAO(connection);

        produtosBanco.lista(function(err, result) {
                // console.log(err);
                // res.send(result);
                res.render('produtos/lista', {lista: result});
            }
        );

        connection.end();
    

    })

    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form.ejs');
    
    })
    
    app.post('/produtos/salva', function(req, res) {

        var produto = req.body;

        console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, function(erros, resultados) {
            res.redirect('/produtos');
        });

      
    })
};