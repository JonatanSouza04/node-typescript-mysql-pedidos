import { createPool }  from 'mysql2/promise';

const connect = async () => {

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'vip',
        port: 3307,
        connectionLimit: 10
    });

    return connection;

}

export default connect;