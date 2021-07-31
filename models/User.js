const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    avatar: {
        type : String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    address : {
        type: String,
    },
    mobileNo : {
        type: String,
    },
    campaign:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'campaign'
    }]
});

module.exports = User = mongoose.model('user', UserSchema)