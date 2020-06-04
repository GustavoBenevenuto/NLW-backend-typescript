import knex from 'knex';
import path from 'path'; 
// Padroniza as barras, em alguns SO pode vir ao contrario \ /

const connection = knex({
    client: 'sqlite3', //Qual banco, SQLite, Mysql, MongoDB...
    connection:{
        filename: path.resolve(__dirname,'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;