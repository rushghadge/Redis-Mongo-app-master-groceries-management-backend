const mongoose = require("mongoose");

const gsSchema = new mongoose.Schema({
    serialno: Number,
    gsType: String, // type could be fruite, veggies 
    name: String,   // item name 
    
});

const gs = mongoose.model('gsList',gsSchema);

module.exports = gs;