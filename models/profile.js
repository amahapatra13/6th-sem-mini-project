const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    address : {
        type: String,
        required: true
    },
    mobileNo : {
        type: String,
        required: true
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'campaigns'
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)