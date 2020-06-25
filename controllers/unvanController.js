const Unvan = require("../models/unvan.model");
const response = require("../response");

const { validationResult } = require("express-validator")

exports.list =(req,res)=> {
    Unvan.find({},(err,unvan)=>{

        if (err) {
            return new response(null, err).error500(res);
        }

        return new response(unvan, null).success(res);
    })
}


exports.create = (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new response(null, errors.array()).error400(res);
    }

    var unvan = new Unvan();
    unvan.unvanId = req.body.unvanId;
    unvan.unvanAd = req.body.unvanAd;

    
    unvan.save((err) => {
        if (err)
            return new response(null, err).error500(res);
        else
            return new response(unvan, null).created(res);

    });

}

