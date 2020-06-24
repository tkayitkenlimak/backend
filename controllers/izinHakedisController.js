const IzınHakedis = require("../models/izinHakedis.model");
const response = require("../response");

const { validationResult } = require("express-validator")


exports.list = (req, res) => {

    IzınHakedis.find({}).sort({
        created: -1
    }).populate("personelBy").exec((err, izinHakedis) => {

        if (err) {
            return new response(null, err).error500(res);
        }
        return new response(izinHakedis, null).success(res);

    })
}


exports.getIzinHakedisById = (req, res) => {

    IzınHakedis.findById(req.params.izinHakedis_id).populate("personelBy").exec((err, izinHakedis) => {

        if (err) {
            return new response(null, err).error500(res);
        }
        if (izinHakedis)
            return new response(izinHakedis, null).success(res);
        else
            return new response(null, err).notFound(res);
    })

}

exports.listByPersonelId = (req, res) => {

    let id = req.params.personel_id;

    IzınHakedis.find({ personelBy: id }).populate("personelBy").exec((err, izinHakedis) => {

        if (err) {
            return new response(null, err).error500(res);
        }
        return new response(izinHakedis, null).success(res);

    })
}


exports.create = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }

    const { kalanIzin, personelBy } = req.body;
    let izinHakedis = new IzınHakedis();
    izinHakedis.kalanIzin = kalanIzin;
    izinHakedis.personelBy = personelBy._id;

    izinHakedis.save((err) => {
        if (err)
            return new response(null, err).error500(res);
        else
            return new response(izinHakedis, null).created(res);

    });

}


exports.update = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }

    IzınHakedis.findById(req.params.personel_id, (err, izinHakedis) => {
        if (err) {
            return new response(null, err).error500(res);
        }

        if (!izinHakedis) {
            return new response().notFound(res);
        }

        const { kalanIzin, personelBy } = req.body;
        izinHakedis.kalanIzin = kalanIzin;
        izinHakedis.personelBy = personelBy._id;

        izinHakedis.save((err) => {
            if (err)
                return new response(null, err).error500(res);
            else
                return new response(izinHakedis, null).success(res);
        })

    })
}


exports.delete = (req, res) => {

    let id = req.params.personel_id;
    IzınHakedis.findOneAndDelete({ _id: id }, (err, izinHakedis) => {
        if (err) {
            return new response(null, err).error500(res);
        }

        if (!izinHakedis) {
            return new response().notFound(res);
        }

        return new response(izinHakedis, null).success(res);

    })

}

