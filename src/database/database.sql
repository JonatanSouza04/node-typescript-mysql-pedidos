 CREATE DATABASE vip;

  CREATE TABLE clientes (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14),
    sexo VARCHAR(50),
    email VARCHAR(150)
  );

   CREATE TABLE produtos (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cor VARCHAR(50),
    tamanho INT,
    valor FLOAT
  );
  

  CREATE TABLE forma_pagto (
     id INT(6) AUTO_INCREMENT PRIMARY KEY,
     descricao VARCHAR(150) NOT NULL
  ); 

  INSERT INTO forma_pagto(descricao) VALUES('Dinheiro');
  INSERT INTO forma_pagto(descricao) VALUES('Cartao');
  INSERT INTO forma_pagto(descricao) VALUES('Cheque');


  CREATE TABLE pedidos (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    cliente INT(6),
    data DATETIME NOT NULL,
    observacao VARCHAR(250),
    forma_pagto INT(6),
    FOREIGN KEY(cliente) REFERENCES clientes(id),
    FOREIGN KEY(forma_pagto) REFERENCES forma_pagto(id)
  );

   CREATE TABLE pedidos_itens (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    pedido INT(6),
    produto INT(6),
    qtd INT,
    valor_unitario Float,
    FOREIGN KEY(produto) REFERENCES produtos(id),
    FOREIGN KEY(pedido) REFERENCES pedidos(id)
  );