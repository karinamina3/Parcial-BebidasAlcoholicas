const BebidasModel = require('../models/BebidasAlcoholicas');
const BebidasControllers = {};

BebidasControllers.create = function(req, res){
    let data = {
        marca: req.body.marca,
        tipo: req.body.tipo,
        annios: req.body.annios
    }
    console.log(data);
    if (req.body.annios > 0) {
        let nuevaBebida = new BebidasModel(data);
        nuevaBebida.save(function(err, guardado){
            if (err){
                res.status(500);
                res.json({code:500, err});
            } else {
                res.json({ok:true, message:'Bebida guardada con éxito', guardado});
            }
        });
    } else {
        console.log("Coloca un Año de Añejo mayor que cero");
    }
}

BebidasControllers.getAll = function(req, res){
    BebidasModel.find({}, function(err, bebidas){
        if (err){
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ok:true, bebidas});
        }
    });
}

BebidasControllers.get = function(req, res){
    BebidasModel.findOne({_id:req.params.id}, function(err, bebida){
        if (err){
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ok:true, bebida});
        }
    });
}

BebidasControllers.update = function(req, res){
    let update = {
        marca: req.body.marca,
        tipo: req.body.tipo,
        annios: req.body.annios
    }
    BebidasModel.findByIdAndUpdate(req.params.id, update, function(err, old){
        if (err){
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ok:true, old, update});
        }
    })
}

BebidasControllers.delete = function(req, res){
    BebidasModel.findByIdAndRemove(req.params.id, function(err, eliminado){
        if (err){
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ok:true, eliminado});
        }
    });
}

module.exports = BebidasControllers;