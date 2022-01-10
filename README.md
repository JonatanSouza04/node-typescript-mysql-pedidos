### Autor
 > Nome: Jonatan Souza
 >
 > E-mail: jonatan.souza04@gmail.com
 >

### Controle de pedidos 
 > Aplicativo que realiza o cadastro de clientes, produtos e pedidos.
 > 
 > Esse aplicativo utilizando Node + Typescript + MySQL.
 > 
 
### Comandos de instalação e execução 
   >(Instalar as dependências) -> npm install 
   > 
   >(Executar em modo dev) -> npm run dev
   > 
   >(Executar os testes unitários) npm t
   > 
   >(Build) npx tcs
   > 
 
### Variáveis de ambiente
 >APP_PORT=3000
 >
 >MYSQL_HOST=localhost
 >
 >MYSQL_USER=root
 >
 >MYSQL_PASSWORD=SUA_SENHA
 >
 >MYSQL_DATABASE=vip
 >
 >MYSQL_PORT=3306   
 
### Utilizando o docker, faça o download da imagem do MySQL
 > docker pull mysql

### Execute o comando para inicializar a imagem MySQL com a senha 1234
 > docker run --name mysql_vip -p 3306:3306 -e MYSQL_ROOT_PASSWORD=SUA_SENHA -d mysql

### Acesse o MySQL dentro do Docker e executer os scripts abaixo
  
  >CREATE DATABASE vip;
  > 
  >CREATE TABLE clientes (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14),
    sexo VARCHAR(50),
    email VARCHAR(150)
  );

  >
  >CREATE TABLE produtos (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cor VARCHAR(50),
    tamanho INT,
    valor FLOAT
   );
  
  >
  
  >CREATE TABLE forma_pagto (
     id INT(6) AUTO_INCREMENT PRIMARY KEY,
     descricao VARCHAR(150) NOT NULL
    ); 

  >
  >INSERT INTO forma_pagto(descricao) VALUES('Dinheiro');
  >
  >INSERT INTO forma_pagto(descricao) VALUES('Cartao');
  >
  >INSERT INTO forma_pagto(descricao) VALUES('Cheque');

  >
  >CREATE TABLE pedidos (
  >    id INT(6) AUTO_INCREMENT PRIMARY KEY,
  >    cliente INT(6),
  >    data DATETIME NOT NULL,
  >    observacao VARCHAR(250),
  >    forma_pagto INT(6),
  >    FOREIGN KEY(cliente) REFERENCES clientes(id),
  >    FOREIGN KEY(forma_pagto) REFERENCES forma_pagto(id)
  >  );
  >
  >  CREATE TABLE pedidos_itens (
  >   id INT(6) AUTO_INCREMENT PRIMARY KEY,
  >    pedido INT(6),
  >    produto INT(6),
  >    qtd INT,
  >    valor_unitario Float,
  >    FOREIGN KEY(produto) REFERENCES produtos(id),
  >    FOREIGN KEY(pedido) REFERENCES pedidos(id)
  >  );

  ### API  
    
   #### Clientes
   > GET: /clientes
   > 
   > GET: /clientes/:id
   > 
   > POST: /clientes
   > 
   > PUT: /clientes/:id
   > 
   > DELETE: /clientes/:id
   > 
     
   #### Produtos
   > GET: /produtos
   > 
   > GET: /produtos/:id
   > 
   > POST: /produtos
   > 
   > PUT: /produtos/:id
   > 
   > DELETE: /produtos/:id    

   #### Pedidos
   > GET: /pedidos
   > 
   > GET: /pedidos/:id
   >
   > GET: /pedidos/:id/itens
   > 
   > POST: /pedidos
   > 
   > PUT: /pedidos/:id
   > 
   > DELETE: /produtos/:id   
   > 
   > POST: /pedidos/:id/sendmail
   > 
   > POST: /pedidos/:id/report
