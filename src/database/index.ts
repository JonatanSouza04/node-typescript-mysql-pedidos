import { createPool }  from 'mysql2/promise';

const connect = async () => {

    const port = process.env.MYSQL_PORT || '3306';
    
    const connection = await createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: parseInt(port),
        connectionLimit: 10
    });

    return connection;

}

export default connect;