import connect  from '../database/index';
import IProdutoRepository from '../repositories/IProdutoRepository';

class Produto {

    public async get_produtos(): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM produtos ORDER BY nome;");

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async get_produto_id(id: number): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM produtos WHERE id = ?;",[id]);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async get_produto_codigo(codigo: string): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query("SELECT * FROM produtos WHERE codigo = ?;",[codigo]);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async create_produtos(body: IProdutoRepository): Promise<any> {

        try {

            const conn = await connect();

            const exists : any = await conn.query("SELECT COUNT(*) as qtd FROM produtos WHERE codigo = ? ",[body.codigo]);

            if(exists[0][0].qtd && exists[0][0].qtd > 0) {
              return  {error: 'Já existe um registro com esse código'};
            }
            
            await conn.query("INSERT INTO produtos SET ?",[body]);

            return {data: 'created'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async update_produtos(body: IProdutoRepository, id: number): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query("UPDATE produtos SET codigo = ?, nome = ?, cor = ?, tamanho = ?, valor = ? WHERE id = ? ",
               [
                 body.codigo, 
                 body.nome,
                 body.cor,
                 body.tamanho,
                 body.valor,
                 id
               ]);

            return {data: 'updated'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async delete_produtos(id: number): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query("DELETE FROM produtos WHERE id = ? ",
               [
                 id
             ]);

            return {data: 'deleted'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

}  

export default new Produto;