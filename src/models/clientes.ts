import connect  from '../database/index';
import IClienteRepository from '../repositories/IClienteRepository';

class Cliente {

    public async get_clientes(): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM clientes ORDER BY nome;");

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async get_cliente_id(id: number): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM clientes WHERE id = ?;",[id]);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async get_cliente_codigo(codigo: string): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM clientes WHERE codigo = ?;",[codigo]);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async create_clientes(body: IClienteRepository): Promise<any> {

        try {

            const conn = await connect();

            const exists : any = await conn.query("SELECT COUNT(*) as qtd FROM clientes WHERE codigo = ? OR email = ?",[body.codigo, body.email]);

            if(exists[0][0].qtd && exists[0][0].qtd > 0) {
              return  {error: 'Já existe um registro com esse código ou e-mail'};
            }
            
            await conn.query("INSERT INTO clientes SET ?",[body]);

            return {data: 'created'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async update_clientes(body: IClienteRepository, id: number): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query("UPDATE clientes SET codigo = ?, nome = ?, cpf = ?, sexo = ?, email = ? WHERE id = ? ",
               [
                 body.codigo, 
                 body.nome,
                 body.cpf,
                 body.sexo,
                 body.email,
                 id
               ]);

            return {data: 'updated'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async delete_clientes(id: number): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query("DELETE FROM clientes WHERE id = ? ",
               [
                 id
             ]);

            return {data: 'deleted'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

}  

export default new Cliente;