const mongoose = require("mongoose");
var personel = require("./personel.model");

var izinSchema = mongoose.Schema({
    izinSuresi :{
        type:Number,
        require :true
    },
    basTarih :{
        type:Date,
        require:true
    },
    sonTarih :{
        type:Date,
        require : true
    },
    onayDurum :{
        type : Number,
        require :true
    },
    izinTipi :{
        type :Number,
        require : true
    },
    adres :{
        type:String,
        require :true
    },
    telefon :{
        type : String,
        require :true
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

module.exports = mongoose.model("izin",izinSchema);