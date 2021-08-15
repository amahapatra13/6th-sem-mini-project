const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
    user : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requiredAmount: {
        type: String,
        required : true
    }
})


module.exports = Campaign = mongoose.model('campaign', CampaignSchema)