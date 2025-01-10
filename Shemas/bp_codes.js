const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')



const codeSystem = new Schema({
    guildID: String,
    activeCodes: Array
});

module.exports = model('codeSystem', codeSystem);