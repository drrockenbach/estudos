var dbConnection = require('../infra/connectionFactory')()

module.exports = function(app) {
    app.get('/produtos', function(req, res) {
        // res.send('listagem produtos');

console.log("dbConnection = "+dbConnection);

        dbConnection.query('select * from livros', function(err, result) {
                // console.log(err);
                res.send(result);
            }
        );

        dbConnection.end();
        // res.render('produtos/lista');

    })
};