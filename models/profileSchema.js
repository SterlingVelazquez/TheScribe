const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    serverID: { type: String, require: true },
    words: { type: Array, default: [] }
})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;