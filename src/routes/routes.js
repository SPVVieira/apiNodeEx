const route = require('express').Router();
const mongoose = require('mongoose');
require('../models/projects');

const project = mongoose.model('projects');

function logs(req, res, next) {
    const { method, url } = req;
    const rotaLog = `[${method.toUpperCase()}] ${url}`;
    console.log(rotaLog);

    return next();
}

route.use(logs);

route.get('/', (req, res) => {
    res.send('HOME');
});

route.get('/projects', (req, res) => {
    const { id } = req.query;
    id
    ? project.findOne({_id: id}).then((ret) => {
        return res.json(ret);
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            'status': 0,
            'mensagem': 'Erro ao buscar projetos'
        });
    })
    : project.find().then((ret) => {
        return res.json(ret);
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            'status': 0,
            'mensagem': 'Erro ao buscar projetos'
        });
    });
});

route.post('/projects', (req, res) => {
    const { title, owner, content } = req.body;
    const erros = [];

    if(!title || typeof title == undefined || title == null || title == '') {
        erros.push({'mensagem': 'Título inválido'});
    }
    if(!owner || typeof owner == undefined || owner == null || owner == '') {
        erros.push({'mensagem': 'Autor inválido'});
    }

    if(!content || typeof content == undefined || content == null || content == '') {
        erros.push({'mensagem': 'Conteúdo inválido'});
    }

    if(erros.length > 0) {
        return res.json({
            'status': 0,
            'mensagem': 'Dados não podem ser nulos ou vazios'
        });
    }

    const newProject = {
        title: title,
        owner: owner,
        content: content
    }
    new project(newProject).save().then(() => {
        return res.json({
            'title': title,
            'owner': owner,
            'content': content
        });
    }).catch((err) => {
        console.log("Erro ao registrar projeto: " + err);
        return res.status(400).json({
            'status': 0,
            'mensagem': 'Erro ao adicionar projeto'
        });
    });
});

route.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner, content } = req.body;

    project.findOne({_id: id}).then((ret) => {
        ret.title = title;
        ret.owner = owner;
        ret.content = content;
        ret.save().then(() => {
            res.json({
                'id': id,
                'title': title,
                'owner': owner,
                'content': content
            });
        }).catch((err) =>{
            console.log(err);
            res.status(400).json({
                'status': 0,
                'mensagem': 'Erro ao alterar projeto'
            });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            'status': 0,
            'mensagem': 'Projeto com o id' + id + 'não encontrado'
        });
    });
});

route.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    
    project.findOne({_id: id}).then((ret) => {
        project.deleteOne({_id: id}).then(() => {
            return res.status(204).json({
                'status': 1,
                'mensagem': 'Projeto deletado com sucesso'
            });
        }).catch((err) =>{
            console.log(err);
            return res.status(400).json({
                'status': 0,
                'mensagem': 'Erro ao deletar projeto'
            });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            'status': 0,
            'mensagem': 'Projeto com o id' + id + 'não encontrado'
        });
    });

 

});


module.exports = route;