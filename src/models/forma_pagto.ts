import connect  from '../database/index';

class FormaPagto {

    public async get_forma_pagto(): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM forma_pagto ORDER BY descricao;");

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async get_forma_pagto_id(id: number): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM forma_pagto WHERE id = ?;",[id]);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

}

export default new FormaPagto;