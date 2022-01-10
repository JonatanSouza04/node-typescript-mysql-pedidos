export default interface IPedidoRepository {
    id?: number;
    data: string;
    observacao: string;
    forma_pagto: number;
    cliente: number;
    itens?: Array<Object>;
}
