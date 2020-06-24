const mongoose = require("mongoose");
var personel = require("./personel.model");

var personelIzinSchema = mongoose.Schema({

    kalanIzin :{
        type :Number,
        require : true,

    },
    optime: {
        type: Date,
        default: () => { return new Date() }
    },
    personelBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:personel  
    }
})

module.exports = mongoose.model("personelIzin",personelIzinSchema);