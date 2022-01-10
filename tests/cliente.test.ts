import Cliente from '../src/models/clientes'
import IClienteRepository from '../src/repositories/IClienteRepository';

const code = '111111';

describe('Teste no módulo de clientes', () => {
    
    it('(POST) http://.../clientes', async () => {

        const body : IClienteRepository = {
             codigo: code,
             nome: 'TESTE create',
             cpf: '12345678950',
             email: 'teste@teste.com.br',
             sexo: 'masculino'
        }

        const data = await Cliente.create_clientes(body);
        expect(data).toHaveProperty('data');

     });

    it('(PUT) http://.../clientes', async () => {

        const getCodigo = await Cliente.get_cliente_codigo(code); 
        
        const body : IClienteRepository = {
            codigo: code,
            nome: 'TESTE UPDATE',
            cpf: '12345678950',
            email: 'teste@teste.com.br',
            sexo: 'masculino'
       }

       const data = await Cliente.update_clientes(body, parseInt(getCodigo[0].id));
       expect(data).toHaveProperty('data');

     });

    it('(GET) http://.../clientes', async () => {

       const getCodigo = await Cliente.get_cliente_codigo(code); 
   
       const data = await Cliente.get_cliente_id(parseInt(getCodigo[0].id));
       expect(data[0]).toHaveProperty('codigo');

     });


    it('(GET) ALL http://.../clientes', async () => {

       const data = await Cliente.get_clientes();
       expect.arrayContaining(data);

    });

    it('(GET) CODE http://.../clientes', async () => {

       const data = await Cliente.get_cliente_codigo(code);
       expect.arrayContaining(data);

    });

    it('(DELETE) http://.../clientes', async () => {

       const getCodigo = await Cliente.get_cliente_codigo(code); 
   
       const data = await Cliente.delete_clientes(parseInt(getCodigo[0].id));
       expect(data).toHaveProperty('data');

     });

})


