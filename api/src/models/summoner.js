const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summonerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"]
    },
    petitions: [{
        type: Schema.ObjectId,
        ref: "Petition"
    }],
    champsBanned: [{
        type: String
    }],
    champsBannedComplete: [{
        type: Object
    }],
    bansCount: {
        type: Number,
        default: 0
    },
    bansStarted: {
        type: Number,
        default: 0
    },

}, { timestamps: true })

const Summoner = mongoose.model("Summoner", summonerSchema);

module.exports = Summoner;