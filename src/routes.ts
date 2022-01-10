import { Router } from "express";
import ClienteController from './controllers/clientes';
import ProdutoController from './controllers/produtos';
import PedidoController from './controllers/pedidos';

const routes = Router();

routes
    .get('/clientes', ClienteController.get)
    .get('/clientes/:id', ClienteController.getId)
    .post('/clientes', ClienteController.post)
    .put('/clientes/:id', ClienteController.put)
    .delete('/clientes/:id', ClienteController.delete)

    .get('/produtos', ProdutoController.get)
    .get('/produtos/:id', ProdutoController.getId)
    .post('/produtos', ProdutoController.post)
    .put('/produtos/:id', ProdutoController.put)
    .delete('/produtos/:id', ProdutoController.delete)

    .get('/pedidos', PedidoController.get)
    .get('/pedidos/:id', PedidoController.getId)
    .get('/pedidos/:id/itens', PedidoController.getItens)
    .post('/pedidos', PedidoController.post)
    .put('/pedidos/:id', PedidoController.put)
    .delete('/pedidos/:id', PedidoController.delete)
    .post('/pedidos/:id/sendmail', PedidoController.sendEmail)
    .post('/pedidos/:id/report', PedidoController.PDF)

export default routes;