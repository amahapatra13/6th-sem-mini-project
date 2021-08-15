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
    }],
    valid : {
        type:Boolean,
        default : true
    },
    ledger : [
        {
            index: {
                type:Number,
            },
            timestamp: {
                type:Date,
                default: Date.now
            },
            data: {
                sender:{
                    type: String,
                },
                recipient : {
                    type : String,
                },
                amount: {
                    type: Number
                }
            },
            hash: {
                type: String,
                default: null
            },
            prevHash : {
                type: String,
                default: null
            } 
        } 
    ]
});

module.exports = User = mongoose.model('user', UserSchema)