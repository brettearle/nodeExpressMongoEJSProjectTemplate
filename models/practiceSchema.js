//require mongoose
const mongoose = require('mongoose')

const practiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('practiceModel', practiceSchema)