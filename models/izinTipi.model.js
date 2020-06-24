const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");


var izinTipiSchema = mongoose.Schema({

    izinTipId: {
        type: Number,
        require: true
    },
    izinTip: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("izinTipi", izinTipiSchema);