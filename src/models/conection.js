const mongoose = require('mongoose');

//Configurando conexão mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/projetos", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
    console.log("Conectado com sucesso ao banco de dados");
}).catch((err) => {
    console.log("ocorreu um erro ao se conectar ao banco de dados: " + err);
});

module.exports = mongoose;