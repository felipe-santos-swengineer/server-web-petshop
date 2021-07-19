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
        res.json(allClientes.rows);
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

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
            id
        ]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
