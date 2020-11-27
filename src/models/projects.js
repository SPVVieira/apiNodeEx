const mongoose = require('./conection');

const ProjectsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

mongoose.model('projects', ProjectsSchema);