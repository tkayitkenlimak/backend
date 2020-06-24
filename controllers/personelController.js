const Personel = require("../models/personel.model");
const response = require("../response");

const { validationResult } = require("express-validator")

//GET http://localhost/api/personel
exports.list =(req,res)=> {
    Personel.find({},(err,personel)=>{

        if (err) {
            return new response(null, err).error500(res);
        }

        return new response(personel, null).success(res);
    })
}


//GET http://localhost/api/personel/123 
exports.getPersonelById = (req, res) => {

    Personel.findById(req.params.personel_id, (err, personel) => {   //personel_id --> api-router da verilen parametre

        if (err) {
            return new response(null, err).error500(res);

        }
        if (personel) {
            return new response(personel, null).success(res);
        }
        else {
            return new response().notFound(res);
        }

    })

}

//POST http://localhost/api/personeş
exports.create = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }

    var personel = new Personel();
    personel.isim = req.body.isim;
    personel.unvan = req.body.unvan;
    personel.yetkiliKisi = req.body.yetkiliKisi;
    
    personel.save((err) => {
        if (err)
            return new response(null, err).error500(res);
        else
            return new response(personel, null).created(res);

    });

}


//PUT http://localhost/api/personel/123
exports.update = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }

    
    Personel.findById(req.params.personel_id, (err, personel) => {
        if (err) {
            return new response(null, err).error500(res);
        }

        if (!personel) {
            return new response().notFound(res);
        }

        personel.isim = req.body.isim;
        personel.unvan = req.body.unvan;
        personel.yetkiliKisi = req.body.yetkiliKisi;
        personel.save((err) => {
            if (err) {
                return new response(null, err).error500(res);
            }

            return new response(personel, null).success(res);
        })

    })

}


//DELETE http://localhost/api/personel/123
exports.delete = (req, res) => {

    Personel.findOneAndDelete({ _id: req.params.personel_id }, (err, personel) => {    //_id mongo db tarafından default olarak verilen kolon adı
        if (err) {
            return new response(null, err).error500(res);
        }

        if (!personel) {
            return new response().notFound(res);
        }

        return new response(personel, null).success(res);

    })

}