import pdf from 'html-pdf';
import Pedido from '../models/pedidos';
import IPedidoItensRepository from '../repositories/IPedidoItensRepository';

export default async function createFilePedido(idPedido: number){

    return await new Promise( async (resolve, _) => {

            const pedido = await Pedido.get_pedido_id(idPedido);
            const itens = await Pedido.get_itens_pedido(idPedido);

            const dadosPedido = pedido[0];

            let valor_total = 0;

            const HTML = `
                <html>
                <h3>Pedido de número: ${dadosPedido.id}</h3>
                <h3>Cliente: ${dadosPedido.cliente_nome}</h3>
                <hr />
                    <h4>Observação:  ${dadosPedido.observacao}</h4>
                    <h4>Forma de pagamento:  ${dadosPedido.forma_pagto_descricao}</h4>
                <hr />
                
                <table>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Total</th>
                    </tr>

                    ${itens.map( (item: IPedidoItensRepository) => {
                        valor_total = valor_total + (item.qtd * item.valor_unitario);
                        return `
                            <tr>
                            <td>${item.produto_nome}</td>
                            <td>${item.qtd}</td>
                            <td>${item.valor_unitario}</td>
                            <td>${item.valor_unitario * item.qtd}</td>
                        `
                    })}
                    
                </table>

                <hr />
                <h4>Valor total do pedido ${valor_total}</h4>
                </html>
            `

            const  options: any = { format: 'Letter' };

                
            pdf.create(HTML, options).toFile(`./files/pedido_${dadosPedido.id}.pdf`, function(err, res) {
            if (err)
                resolve({error: err})

                resolve(res)

            });

  
    });
}