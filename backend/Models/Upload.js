const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    mylink: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Upload', uploadSchema);
