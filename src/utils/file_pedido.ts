import pdf from 'html-pdf';
import Pedido from '../models/pedidos';
import IPedidoItensRepository from '../repositories/IPedidoItensRepository';

export default async function createFilePedido(idPedido: number){

    return await new Promise( async (resolve, _) => {

            const detail = await Pedido.detail_pedidos(idPedido);

            const pedido = detail.pedido;
            const itens  = detail.itens;
            const cliente = detail.cliente;

            let valor_total = 0;

            const HTML = `
                <html>
                <h3>Pedido de número: ${pedido.id}</h3>
                <h3>Cliente: ${pedido.cliente_nome}</h3>
                <h3>E-mail: ${cliente.email}</h3>
                <h3>CPF: ${cliente.cpf}</h3>
                <hr />
                    <h4>Observação:  ${pedido.observacao}</h4>
                    <h4>Forma de pagamento:  ${pedido.forma_pagto_descricao}</h4>
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

                
            pdf.create(HTML, options).toFile(`./files/pedido_${pedido.id}.pdf`, function(err, res) {
            if (err)
                resolve({error: err})

                const result = {
                    file: res,
                    detail
                }
                
                resolve(result)

            });

  
    });
}