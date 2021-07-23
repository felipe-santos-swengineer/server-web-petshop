const fetch = require("node-fetch");

const insomnia = async () => {
    //Get clientes
    try {
        console.log("GetClientes: ");
        const response = await fetch("http://localhost:5000/clientes",
            {
                method: "GET",
            }
        );
        var resJSON = await response.json();
        console.log(resJSON);

    } catch (err) {
        console.log(err);
    }

    //Get animais
    try {
        console.log("GetAnimais: ");
        const response = await fetch("http://localhost:5000/animais",
            {
                method: "GET",
            }
        );
        var resJSON = await response.json();
        console.log(resJSON);

    } catch (err) {
    }

    /*
    //InsertCliente
 
    console.log("InsertCliente: ")
    try {
        const body = {
            "nomeCliente": "Cliente Novo",
            "telefoneCliente": "111222333",
            "enderecoCliente": "Rua Nova",
            "cpfCliente": "88888888810"
        };
        const response = await fetch("http://localhost:5000/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });


        var resJSON = await response.json();
        console.log(resJSON);


    } catch (err) {
        console.log(err);
    }

    
    //InsertAnimal

    console.log("InsertAnimal: ")
    try {
        const body = {
            "nomeAnimal" : "animal novo",
            "idadeAnimal": "10",
            "tipoAnimal": "Gato",
            "pesoAnimal": "5.1",
            "racaAnimal": "Felina",
            "cpfDono": "12345678911"
        };
        const response = await fetch("http://localhost:5000/animais", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });


        var resJSON = await response.json();
        console.log(resJSON);


    } catch (err) {
        console.log(err);
    }
    */


    //UpdateCliente

    try {
        var nome = "Cliente Atualizado";
        var telefone = "12345678";
        var endereco = "Novo endereco";
        var editID = 8;

        const body = { nome, telefone, endereco };
        const response = await fetch(`http://localhost:5000/clientes/` + editID,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );
        
        var resJSON = await response.json();
        console.log(resJSON);

    } catch (err) {
        console.error(err.message);
    }

    //UpdateAnimal

    try {
        var nome = "Nome novo";
        var peso = "30";
        var raca = "Raça nova";
        var idade = "2";
        var tipo = "Gato";
        var editID = 9;

        const body = { nome, peso, raca, idade, tipo };
        const response = await fetch(`http://localhost:5000/animais/` + editID,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );
        
        var resJSON = await response.json();
        console.log(resJSON);

    } catch (err) {
        console.error(err.message);
    }


    //DeleteCliente

    try {
        var deleteCPF = "12345678911";
        const deletecliente = await fetch(`http://localhost:5000/clientes/` + deleteCPF, {
            method: "DELETE"
        });

        var resJSON = await deletecliente.json();
        console.log(resJSON);
       
    } catch (err) {
        console.error(err.message);
    }

    //DeleteAnimais

    try {
        var deleteId = 9;
        const deleteAnimal = await fetch(`http://localhost:5000/animais/` + deleteId, {
            method: "DELETE"
        });

        var resJSON = await deleteAnimal.json();
        console.log(resJSON);

    } catch (err) {
        console.error(err.message);
    }
}

insomnia();
