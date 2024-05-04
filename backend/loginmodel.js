const mongoose = require('mongoose');

const logInSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true},
    username: { type: String, required: true , unique : true },
    password: { type: String, required: true},
}, { timestamps: true });

const logModel = mongoose.model('loloModel', logInSchema);

module.exports = { logModel };
