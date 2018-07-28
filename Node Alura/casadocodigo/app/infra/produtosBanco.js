module.exports = function() {
    // Tem que fazer esse return function por conta do express-load. Pois se colocar a connection na function
    // do exports o express-load vai passar conection null e vai dar erro.
    return function(connection) {
        this.lista = function (callback) {
            connection.query('select * from livros', callback)
        }
    
        return this;
    }
}

