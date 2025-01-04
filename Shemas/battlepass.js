const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')



const battlepass = new Schema({
    userId: String,
    messageCount: { type: Number, default: 1 },
    level: { type: Number, default: 0},
    has_goldpass: { type: Boolean, default: false }
});

module.exports = model('Battlepass', battlepass);