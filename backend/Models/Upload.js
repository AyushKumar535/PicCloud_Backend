const mongoose = require('mongoose')
const uploadSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    link: {
        type: String,

    },
})
const uploadFilesSchema = mongoose.model('upload', uploadSchema);
module.exports = uploadFilesSchema;