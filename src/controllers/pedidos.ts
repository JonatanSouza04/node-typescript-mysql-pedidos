import { Request, Response } from 'express';

import model from "../models/pedidos";
import modelCli from "../models/clientes";
import modelPro from "../models/produtos";
import modelPagto from "../models/forma_pagto";


import IPedidoRepository from '../repositories/IPedidoRepository';
import IPedidoItensRepository from '../repositories/IPedidoItensRepository';
import ISendEmailRepository from '../repositories/ISendEmailRepository';

import createFilePedido from '../utils/file_pedido';
import sendEmail from '../utils/send_email';
import { promises as fs} from 'fs';

class PedidoController {

      public async get( req: Request, res: Response): Promise<Response> {

            const data = await model.get_pedidos();

            if(data?.error){
                return res.status(400).json({message: data.error});
            }
            return res.status(200).json({data});
           
      }

      public async getId( req: Request, res: Response): Promise<Response> {

           if(!req?.params?.id){
             return res.status(400).json({message: 'Requisição inválida'});
           }

            const data = await model.get_pedido_id(parseInt(req?.params?.id));

            if(data?.error){
                return res.status(400).json({message: data.error});
            }
            return res.status(200).json({data});
           
      }

      public async getItens( req: Request, res: Response): Promise<Response> {

           if(!req?.params?.id){
             return res.status(400).json({message: 'Requisição inválida'});
           }

            const data = await model.get_itens_pedido(parseInt(req?.params?.id));

            if(data?.error){
                return res.status(400).json({message: data.error});
            }
            return res.status(200).json({data});
           
      }


      public async post( req: Request, res: Response): Promise<Response> {

         if(!req.body || !req.body || !req.body.data || !req.body.cliente || !req.body.observacao || !req.body.forma_pagto){
           return res.status(400).json({message: 'Requisição inválida'});
          }

          if(!req.body.itens || req.body.itens.length === 0){
            return res.status(400).json({message: 'Favor informar os produtos nos itens'});
          }

          let produtos_falha: any = [];

          const validProduct: any = await new Promise( async (resolve, _) => {

                const count = req.body.itens.length;

                for(let i = 0; i < count; i++){

                    const item: IPedidoItensRepository = req.body.itens[i];
                    const pro = await modelPro.get_produto_id(item.produto);

                    if(pro.length === 0)
                      produtos_falha.push({produto: item.produto, message: 'Produto inválido'});
                    else
                    if(item.qtd <= 0){
                        produtos_falha.push({produto: item.produto, message: 'Quantidade inválida'});
                    }

                    if(i >= count - 1)
                     resolve(produtos_falha);
               }
              

          })

          const resultFalhas = await Promise.all(validProduct);

          if(resultFalhas.length > 0){
            return res.status(406).json({error: true, message: resultFalhas});  
          }

          const cliente = await modelCli.get_cliente_id(req.body.cliente);

          if(cliente.length === 0){
            return res.status(404).json({message: 'Cliente inválido'});  
          }

          const pagto = await modelPagto.get_forma_pagto_id(req.body.forma_pagto);

          if(pagto.length === 0){
            return res.status(404).json({message: 'Forma de pagamento inválida'});  
          }

          const itens = req.body.itens;
          delete req.body.itens;

          const body : IPedidoRepository = req.body;

          let result = await model.create_pedidos(body, itens);
  
          if(result?.error){
              return res.status(400).json({message: result.error});
          }

          result.data = await model.detail_pedidos(result.data[0].id);

          return res.status(200).json(result.data);
       
      }

      public async put( req: Request, res: Response): Promise<Response> {

          if(!req?.params?.id || !req.body || !req.body.data || !req.body.cliente || !req.body.observacao || !req.body.forma_pagto){
           return res.status(400).json({message: 'Requisição inválida'});
          }

          const cliente = await modelCli.get_cliente_id(req.body.cliente);

          if(cliente.length === 0){
            return res.status(404).json({message: 'Cliente inválido'});  
          }

          const pagto = await modelPagto.get_forma_pagto_id(req.body.forma_pagto);

          if(pagto.length === 0){
            return res.status(404).json({message: 'Forma de pagamento inválida'});  
          }

          const body : IPedidoRepository = req.body;

          const data = await model.update_pedidos(body, parseInt(req.params.id));

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
          const data = await model.delete_pedidos(id);

          if(data?.error){
              return res.status(400).json({message: data.error});
          }

          return res.status(200).json(data);
       
      }

      public async sendEmail( req: Request, res: Response): Promise<Response> {

         const id: number = req?.params?.id ? parseInt(req.params.id) : 0;
         const pedido: any = await createFilePedido(id);
         const path: string = pedido.file.filename;
         
         const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

         if(pedido.detail.cliente.email === '' ||pedido.detail.cliente.email === null || !emailRegexp.test(pedido.detail.cliente.email) ){
           return res.status(404).json({message: 'E-mail do cliente inválido'});
         }
        
         const data = await fs.readFile(path);
         const envio: ISendEmailRepository = {
                  para: pedido.detail.cliente.email,
                  assunto: `Pedido de Número ${req.params.id}`,
                  mensagem: `<h1>Olá ${pedido.detail.cliente.nome}, você está recebendo o e-mail do pedido ${req.params.id}</h1>`,
                  anexos: [{
                      filename: `Pedido_${req.params.id}.pdf`,
                      content: data 
                  }]
          };
      
         await sendEmail(envio); 

         return res.status(200).json({message: 'E-mail enviado com sucesso', email: pedido.detail.cliente.email})

      }

      public async PDF( req: Request, res: Response) {
          
          const id: number = req?.params?.id ? parseInt(req.params.id) : 0;
          const pedido: any = await createFilePedido(id);
          const path: string = pedido.file.filename;

          res.setHeader('Content-disposition', `attachment; filename=${path}`);
          res.setHeader('Content-type', 'application/pdf');
          res.download(path);
      }

}  

export default new PedidoController;
