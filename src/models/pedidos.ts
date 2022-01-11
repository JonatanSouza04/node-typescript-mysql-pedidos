import connect  from '../database/index';
import IPedidoRepository from '../repositories/IPedidoRepository';
import IPedidoItensRepository from '../repositories/IPedidoItensRepository';
import modelCli from "../models/clientes";

class Pedido {

    public async get_pedidos(): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query(`
                            SELECT p.*, c.nome as cliente_nome, f.descricao as forma_pagto_descricao  
                            FROM pedidos p INNER JOIN clientes c on p.cliente = c.id
                                 INNER JOIN forma_pagto f on p.forma_pagto = f.id
                            ORDER BY p.data     
                            ;
                        `);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async get_pedido_id(id: number): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query(`
                    SELECT p.*, c.nome as cliente_nome, f.descricao as forma_pagto_descricao  
                    FROM pedidos p INNER JOIN clientes c on p.cliente = c.id
                        INNER JOIN forma_pagto f on p.forma_pagto = f.id
                    WHERE p.id = ?;
            `,[id]);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async get_itens_pedido(id: number): Promise<any> {

        try {

            const conn = await connect();
            const data = await conn.query(`
                    SELECT i.*, p.nome as produto_nome  
                    FROM pedidos_itens i INNER JOIN produtos p on i.produto = p.id
                    WHERE i.pedido = ?;
            `,[id]);

            return data[0];

        } catch ({ message }) {
            return {error: message};
        }
         
    }


    public async create_pedidos(body: IPedidoRepository, itens: any): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query("INSERT INTO pedidos SET ?",[body]);

            const pedido: any =  await conn.query(`
                           SELECT * 
                           FROM pedidos WHERE cliente = ? AND data = ? AND observacao = ? AND forma_pagto = ?
                           ORDER BY id DESC
                           LIMIT 1; 
                        `,[
                body.cliente,
                body.data,
                body.observacao,
                body.forma_pagto
            ])

            const idPedido: number = pedido[0][0].id;


            let itens_add: any = [];
   
                // Salvar os itens do pedido
                const itensAdd: any = await new Promise( async (resolve, _) => {
   
                       const count = itens.length;
   
                       for(let i = 0; i < count; i++){
   
                           let item: IPedidoItensRepository = itens[i];
   
                           item.pedido = idPedido;
                             
                           await this.create_itens_pedidos(item);
   
                           itens_add.push(itens_add);
   
                           if(i >= count - 1)
                            resolve(itens_add);
                   }
               });
   
            await Promise.all(itensAdd);
   
   
            return {data: pedido[0], message: 'created'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async update_pedidos(body: IPedidoRepository, id: number): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query("UPDATE pedidos SET  cliente = ?, data = ?, observacao = ?, forma_pagto = ? WHERE id = ? ",
               [
                 body.cliente,
                 body.data,
                 body.observacao,
                 body.forma_pagto,
                 id
               ]);

            return {data: 'updated'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }

    public async delete_pedidos(id: number): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query(`
                   DELETE FROM pedidos_itens WHERE pedido = ?
               `,
               [
                id
             ]);

            await conn.query(`
                   DELETE FROM pedidos WHERE id = ?;
               `,
               [
                 id
             ]);

            return {data: 'deleted'};

        } catch ({ message }) {
            return {error: message};
        }
         
    }


    public async create_itens_pedidos(body: IPedidoItensRepository): Promise<any> {

        try {

            const conn = await connect();
            
            await conn.query(`
                       INSERT INTO pedidos_itens(pedido, produto, qtd, valor_unitario) 
                       VALUES(?,?,?,?)
                     `,[
                          body.pedido,
                          body.produto,
                          body.qtd,
                          body.valor_unitario
                      ]);

            return {data: true};

        } catch ({ message }) {
            return {error: message};
        }
         
    }


    public async detail_pedidos(id: number): Promise<any> {

        const conn  = await connect();
        const data  = await conn.query(`
                            SELECT p.*, c.nome as cliente_nome, f.descricao as forma_pagto_descricao  
                            FROM pedidos p INNER JOIN clientes c on p.cliente = c.id
                                INNER JOIN forma_pagto f on p.forma_pagto = f.id
                            WHERE p.id = ?;
                            `
                   ,[id]);

        const itens = await conn.query(`
                        SELECT i.*, p.nome as produto_nome  
                        FROM pedidos_itens i INNER JOIN produtos p on i.produto = p.id
                        WHERE i.pedido = ?;
                      `,[id]);

        const pedido: any  = data[0];
        const cliente: any = await modelCli.get_cliente_id(pedido[0].cliente);
     
        return {
            pedido: pedido[0],
            itens: itens[0],
            cliente: cliente[0]
        } 

    }

}  

export default new Pedido;