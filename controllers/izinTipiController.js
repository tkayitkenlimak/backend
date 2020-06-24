const IzinTipi = require("../models/izinTipi.model");
const response = require("../response");

const { validationResult } = require("express-validator")

exports.list =(req,res)=> {
    IzinTipi.find({},(err,izinTipi)=>{

        if (err) {
            return new response(null, err).error500(res);
        }

        return new response(izinTipi, null).success(res);
    })
}


exports.create = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }

    var izinTipi = new IzinTipi();
    izinTipi.izinTipId = req.body.izinTipId;
    izinTipi.izinTip = req.body.izinTip;

    
    izinTipi.save((err) => {
        if (err)
            return new response(null, err).error500(res);
        else
            return new response(izinTipi, null).created(res);

    });

}

