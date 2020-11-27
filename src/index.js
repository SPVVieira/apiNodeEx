const express = require('express');
const rotas = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(rotas);

const porta = (process.env.PORT || 3000);



app.listen(porta, () =>{
    console.log("Servidor rodando na porta " + porta);
});