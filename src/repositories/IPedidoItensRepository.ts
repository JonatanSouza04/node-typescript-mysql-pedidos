export default interface IPedidoRepository {
    id?: number;
    pedido: number;
    produto: number;
    qtd: number;
    valor_unitario: number;
    produto_nome?:string;
}
