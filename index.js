const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Rotas//

//CREATE cliente

app.post("/clientes", async (req, res) => {
    try {

        //const newClient é o json do cliente que deve ser criado no banco
        const newClient = req.body;
        console.log(newClient);

        //função do PG QUERY para armazenar registros em uma tabela
        await pool.query("INSERT INTO clientes(nome,telefone,endereco,cpf) VALUES ($1,$2,$3,$4)",
            [newClient.nomeCliente, newClient.telefoneCliente, newClient.enderecoCliente, newClient.cpfCliente]
        );

        res.json({});

    } catch (err) {
        console.error(err.message);
    }
});

//CREATE animal

app.post("/animais", async (req, res) => {
    try {
        //const newAnimal é o json do animal que deve ser criado no banco
        const newAnimal = req.body;
        console.log(newAnimal);

        //função do PG QUERY para armazenar registros em uma tabela
        await pool.query("INSERT INTO animais(nome,idade,tipo,peso,raca,cpfdono) VALUES ($1,$2,$3,$4,$5,$6)",
            [newAnimal.nomeAnimal, newAnimal.idadeAnimal, newAnimal.tipoAnimal, newAnimal.pesoAnimal,
            newAnimal.racaAnimal, newAnimal.cpfDono]
        );

        res.json({});

    } catch (err) {
        console.error(err.message);
    }
});


//READ

//Retornar todos os clientes

app.get("/clientes", async (req, res) => {
    try {
        //função do PG QUERY para pegar todos registros de uma tabela
        const allClientes = await pool.query("SELECT * FROM clientes");

        //JSON resposta para o client-side
        if (allClientes.rowCount < 1) {
            res.json({});
        }
        else {
            res.json(allClientes.rows);
        }
    } catch (err) {
        console.error(err.message);
    }
});

//Retornar todos os animais

app.get("/animais", async (req, res) => {
    try {
        //função do PG QUERY para pegar todos registros de uma tabela
        const allAnimais = await pool.query("SELECT * FROM animais");

        //JSON resposta para o client-side
        //JSON resposta para o client-side
        if (allAnimais.rowCount < 1) {
            res.json({});
        }
        else {
            res.json(allAnimais.rows);
        }
    } catch (err) {
        console.error(err.message);
    }
});

//Retornar um cliente espefico, filtrando por CPF

app.get("/clientes/:cpf", async (req, res) => {
    try {
        const { cpf } = req.params;
        console.log(cpf)

        const users = await pool.query("SELECT * FROM clientes WHERE cpf = $1", [cpf]);
        console.log(users.rows[0]);
        if (users.rows[0] === undefined) {
            res.json({})
        }
        else {
            res.json(users.rows[0]);
        }

    } catch (err) {
        console.error(err.message);
    }
});

//update cliente

app.put("/clientes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const myJson = req.body;
        console.log(id);
        console.log(myJson);

        //update nome
        const updateClienteNome = await pool.query(
            "UPDATE clientes SET nome = $1 WHERE id = $2",
            [myJson.nome, id]
        );
        //update telefone
        const updateClienteTelefone = await pool.query(
            "UPDATE clientes SET telefone = $1 WHERE id = $2",
            [myJson.telefone, id]
        );
        //update endereço
        const updateClienteEndereco = await pool.query(
            "UPDATE clientes SET endereco = $1 WHERE id = $2",
            [myJson.endereco, id]
        );

        res.json("Cliente Atualizado!");
    } catch (err) {
        console.error(err.message);
        res.json("Cliente Não-Atualizado!");
    }
});

//update animal

app.put("/animais/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const myJson = req.body;
        console.log(id);
        console.log(myJson);

        //update nome
        const updateAnimalNome = await pool.query(
            "UPDATE animais SET nome = $1 WHERE id = $2",
            [myJson.nome, id]
        );
        //update idade
        const updateAnimalIdade = await pool.query(
            "UPDATE animais SET idade = $1 WHERE id = $2",
            [myJson.idade, id]
        );
        //update peso
        const updateAnimalPeso = await pool.query(
            "UPDATE animais SET peso = $1 WHERE id = $2",
            [myJson.peso, id]
        );
        //update tipo
        const updateAnimalTipo = await pool.query(
            "UPDATE animais SET tipo = $1 WHERE id = $2",
            [myJson.tipo, id]
        );
        //update raca
        const updateAnimalRaca = await pool.query(
            "UPDATE animais SET raca = $1 WHERE id = $2",
            [myJson.raca, id]
        );

        res.json("Animal Atualizado!");
    } catch (err) {
        console.error(err.message);
        res.json("Animal Não-Atualizado!");
    }
});

//delete animal

app.delete("/animais/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAnimal = await pool.query("DELETE FROM animais WHERE id = $1", [id]);
        res.json("Animal Deletado!");
    } catch (err) {
        console.log(err.message);
    }
});

//delete cliente

app.delete("/clientes/:cpf", async (req, res) => {
    try {
        const { cpf } = req.params;
        const animaisPendentes = await pool.query("SELECT animais.nome FROM animais INNER JOIN clientes ON cpf = cpfdono Where cpf = $1;", [cpf]);
        console.log("cpf: " + cpf + " possui: " + animaisPendentes.rowCount + " animais");


        if(animaisPendentes.rowCount < 1){
            const deleteCliente = await pool.query("DELETE FROM clientes WHERE cpf = $1", [cpf]);
            res.json("Cliente Deletado!");
        }
        else{
            res.json("Há animais cadastrados com esse cliente, delete-os!");
        }
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});



