const Izın = require("../models/izin.model");
const response = require("../response");

const { validationResult } = require("express-validator")


exports.list = (req, res) => {

    Izın.find({}).sort({
        created: -1
    }).populate("personelBy").exec((err, izin) => {

        if (err) {
            return new response(null, err).error500(res);
        }
        return new response(izin, null).success(res);

    })
}


exports.getIzinById = (req, res) => {

    Izın.findById(req.params.izin_id).populate("personelBy").exec((err, izin) => {

        if (err) {
            return new response(null, err).error500(res);
        }
        if (izin)
            return new response(izin, null).success(res);
        else
            return new response(null, err).notFound(res);
    })

}

exports.listByPersonelId = (req, res) => {

    let id = req.params.personel_id;

    Izin.find({ personelBy: id }).populate("personelBy").exec((err, izin) => {

        if (err) {
            return new response(null, err).error500(res);
        }
        return new response(izin, null).success(res);

    })
}


exports.create = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }


    const { izinSuresi, basTarih, sonTarih, izinTipi, adres, telefon, personelBy } = req.body;
    let izin = new Izın();
    izin.izinSuresi = izinSuresi;
    izin.basTarih = basTarih;
    izin.sonTarih = sonTarih;
    izin.izinTipi = izinTipi;
    izin.adres = adres;
    izin.onayDurum = 0;
    izin.telefon = telefon;
    izin.personelBy = personelBy._id;

    izin.save((err) => {
        if (err)
            return new response(null, err).error500(res);
        else
            return new response(izin, null).created(res);


    });

}


exports.update = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }


    Izın.findById(req.params.personel_id, (err, izin) => {
        if (err) {
            return new response(null, err).error500(res);
        }

        if (!izin) {
            return new response().notFound(res);
        }

        const { izinSuresi, basTarih, sonTarih, izinTipi, adres, telefon, onayDurum, personelBy } = req.body;

        izin.izinSuresi = izinSuresi;
        izin.basTarih = basTarih;
        izin.sonTarih = sonTarih;
        izin.izinTipi = izinTipi;
        izin.onayDurum = onayDurum;
        izin.adres = adres;
        izin.telefon = telefon;
        izin.personelBy = personelBy._id;

        izin.save((err) => {
            if (err)
                return new response(null, err).error500(res);
            else
                return new response(izin, null).success(res);
        })

    })
}


exports.delete = (req, res) => {

    let id = req.params.personel_id;
    Izın.findOneAndDelete({ _id: id }, (err, izin) => {
        if (err) {
            return new response(null, err).error500(res);
        }

        if (!izin) {
            return new response().notFound(res);
        }

        return new response(izin, null).success(res);

    })

}

