import Pedido from '../src/models/pedidos'
import Cliente from '../src/models/clientes';

import IPedidoRepository from '../src/repositories/IPedidoRepository';
import IPedidoItensRepository from '../src/repositories/IPedidoItensRepository';

describe('Teste no módulo de pedidos', () => {
    
    it('(POST) http://.../pedidos', async () => {

        const clientes = await Cliente.get_clientes();

        const itens: Omit<IPedidoItensRepository,"id" | "pedido"> = {
          produto: 1,
          qtd:1,
          valor_unitario: 100,
        }

        let body : Omit<IPedidoRepository,"id"> = {
            data: "2022-01-10",
            observacao: "ENTREGAR APÓS ÁS 12:00",
            forma_pagto: 1,
            cliente: clientes[0].id
        }

        const data = await Pedido.create_pedidos(body, [itens]);

        expect(data).toHaveProperty('data');

     });

    it('(PUT) http://.../pedidos', async () => {

        const getPedido = await Pedido.get_pedidos(); 
        
        let body : Omit<IPedidoRepository,"id" |"itens"> = {
          data: getPedido[0].data,
          observacao: "ENTREGAR APÓS ÁS 13:00",
          forma_pagto: 1,
          cliente: getPedido[0].cliente,
       }

       const data = await Pedido.update_pedidos(body, parseInt(getPedido[0].id));
       expect(data).toHaveProperty('data');

     });

    it('(GET) http://.../pedidos', async () => {

       const getCodigo = await Pedido.get_pedidos(); 
   
       const data = await Pedido.get_pedido_id(parseInt(getCodigo[0].id));
       expect.arrayContaining(data);

     });


     it('(GET) ALL http://.../pedidos', async () => {

       const data = await Pedido.get_pedidos();
       expect.arrayContaining(data);

    });



    it('(DELETE) http://.../pedidos', async () => {

       const getCodigo = await Pedido.get_pedidos(); 
   
       const data = await Pedido.delete_pedidos(parseInt(getCodigo[0].id));
       expect(data).toHaveProperty('data');

     });

})


