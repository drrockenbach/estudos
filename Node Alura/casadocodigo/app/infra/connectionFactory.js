var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'sys'
        }
    );
}

// wrapper ( embrulho) - Isso ser para evitar que o express-load, ao carregar a connectionFactory, 
// já abra a conexão com o banco
module.exports = function() {
    return createDBConnection;
}
