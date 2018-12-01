const mongoose = require('mongoose');
const {mongodb} = require('../config/keys');

mongoose.connect(mongodb.URI, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(db => console.log('Se conecto a la base correctamente!!'))
.catch(err => console.log('Error'));