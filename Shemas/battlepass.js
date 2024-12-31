const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')



const verifySystem = new Schema({
    guildId: String,
    userId: String,
    userName: String,
    Attempts: { type: Number, default: 3 },
    randomCode: String
});

module.exports = model('Verifying', verifySystem);