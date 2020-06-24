const mongoose = require("mongoose");

var personelSchema = mongoose.Schema({

    isim: {
        type: String,
        require: true
    },
    unvan: {
        type: String,
        require: true
    },
    yetkiliKisi: {
        type: String,
        require: false
    },
    optime: {
        type: Date,
        default: () => { return new Date() }
    }
})

module.exports = mongoose.model("personel",personelSchema);