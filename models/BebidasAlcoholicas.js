const mongoose = require('mongoose');
let BebidasModel = new mongoose.Schema({
    marca: {type:String, required:true},
    tipo: {type:String, required:true},
    annios: {type:Number, required:true}
});

module.exports = mongoose.model('bebidas', BebidasModel);