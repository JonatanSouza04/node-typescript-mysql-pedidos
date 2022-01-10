import { Router } from "express";
import ClienteController from './controllers/clientes';

const routes = Router();

routes
    .get('/clientes', ClienteController.get)
    .get('/clientes/:id', ClienteController.getId)
    .post('/clientes', ClienteController.post)
    .put('/clientes', ClienteController.put)
    .delete('/clientes/:id', ClienteController.delete)

export default routes;