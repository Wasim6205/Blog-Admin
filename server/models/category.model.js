const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    blogs:[{type: mongoose.Schema.Types.ObjectId, ref:"blog"}]
},{timestamps:true});

module.exports = mongoose.model("category",catSchema)