DROP TABLE IF EXISTS animais;

CREATE TABLE IF NOT EXISTS animais(
	id SERIAL NOT NULL,
	nome VARCHAR(50) NOT NULL,
	idade VARCHAR(50) NOT NULL,
	tipo VARCHAR(50) NOT NULL,
	peso VARCHAR(50) NOT NULL,
	raca VARCHAR(50) NOT NULL,
	cpfdono VARCHAR(50) NOT NULL,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

--INSERT INTO animais (nome,idade,tipo,peso,raca,cpfdono) VALUES ('Rex','10','Cachorro','23.5','Canina','12345678911');
--SELECT * FROM animais;

DROP TABLE IF EXISTS clientes;

CREATE TABLE IF NOT EXISTS clientes(
	id SERIAL NOT NULL,
	nome VARCHAR(50) NOT NULL,
	telefone VARCHAR(50) NOT NULL,
	endereco VARCHAR(50) NOT NULL,
	cpf VARCHAR(50) NOT NULL,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

--INSERT INTO clientes (nome,telefone,endereco,cpf) VALUES ('felipe','999999999','Rua sla','12345678911');
--SELECT * FROM clientes;