const mongoose = require("mongoose");

var unvanSchema = mongoose.Schema({

    unvanId: {
        type: Number,
        require: true
    },
    unvanAd: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("unvan", unvanSchema);