import { Request, Response } from 'express';

import model from "../models/clientes";
import IClienteRepository from '../repositories/IClienteRepository';

class ClienteController {

      public async get( req: Request, res: Response): Promise<Response> {

           let data: any = null;

           if(req?.query?.codigo && req?.query?.codigo !== ''){
              const codigo : string = req.query.codigo.toString();
              data = await model.get_cliente_codigo(codigo);
           }
           else
            data = await model.get_clientes();

            if(data?.error){
                return res.status(400).json({message: data.error});
            }
            return res.status(200).json({data});
           
      }

      public async getId( req: Request, res: Response): Promise<Response> {

           if(!req?.params?.id){
             return res.status(400).json({message: 'Requisição inválida'});
           }

            const data = await model.get_cliente_id(parseInt(req?.params?.id));

            if(data?.error){
                return res.status(400).json({message: data.error});
            }
            return res.status(200).json({data});
           
      }

      public async post( req: Request, res: Response): Promise<Response> {

          if(!req.body || !req.body.codigo || !req.body.nome || !req.body.cpf || !req.body.sexo || !req.body.email){
          return res.status(400).json({message: 'Requisição inválida'});
          }

          const body : IClienteRepository = req.body;

          const data = await model.create_clientes(body);

          if(data?.error){
              return res.status(400).json({message: data.error});
          }

          return res.status(200).json(data);
       
      }

      public async put( req: Request, res: Response): Promise<Response> {

          if(!req?.params?.id || !req.body || !req.body.codigo || !req.body.nome || !req.body.cpf || !req.body.sexo || !req.body.email){
           return res.status(400).json({message: 'Requisição inválida'});
          }

          const body : IClienteRepository = req.body;

          const data = await model.update_clientes(body, parseInt(req.params.id));

          if(data?.error){
              return res.status(400).json({message: data.error});
          }

          return res.status(200).json(data);
       
      }

      public async delete( req: Request, res: Response): Promise<Response> {

          if(!req?.params?.id){
            return res.status(400).json({message: 'Requisição inválida'});
          }
           
          const id : number = parseInt(req.params.id);
          const data = await model.delete_clientes(id);

          if(data?.error){
              return res.status(400).json({message: data.error});
          }

          return res.status(200).json(data);
       
      }

}  

export default new ClienteController;
