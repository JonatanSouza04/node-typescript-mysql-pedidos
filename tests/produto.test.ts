import * as dotenv from 'dotenv';
dotenv.config();

import Produto from '../src/models/produtos'
import IProdutoRepository from '../src/repositories/IProdutoRepository';

const code = 'PPP000';

describe('Teste no módulo de produtos', () => {
    
    it('(POST) http://.../produtos', async () => {

        const body : IProdutoRepository = {
             codigo: code,
             nome: 'TESTE create produto',
             cor: 'VERDE',
             tamanho: 10,
             valor: 999.99
        }

        const data = await Produto.create_produtos(body);
        expect(data).toHaveProperty('data');

     });

    it('(PUT) http://.../produtos', async () => {

        const getCodigo = await Produto.get_produto_codigo(code); 
        
        const body : IProdutoRepository = {
            codigo: code,
            nome: 'TESTE create produto',
            cor: 'VERDE',
            tamanho: 5,
            valor: 1.99
       }

       const data = await Produto.update_produtos(body, parseInt(getCodigo[0].id));
       expect(data).toHaveProperty('data');

     });

    it('(GET) http://.../produtos', async () => {

       const getCodigo = await Produto.get_produto_codigo(code); 
   
       const data = await Produto.get_produto_id(parseInt(getCodigo[0].id));
       expect(data[0]).toHaveProperty('codigo');

     });


     it('(GET) ALL http://.../produtos', async () => {

       const data = await Produto.get_produtos();
       expect.arrayContaining(data);

    });

    it('(GET) CODE http://.../produtos', async () => {

      const data = await Produto.get_produto_codigo(code);
      expect.arrayContaining(data);

   });

    it('(DELETE) http://.../produtos', async () => {

       const getCodigo = await Produto.get_produto_codigo(code); 
   
       const data = await Produto.delete_produtos(parseInt(getCodigo[0].id));
       expect(data).toHaveProperty('data');

     });

})


