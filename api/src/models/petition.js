const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petitionSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    champion: {
        type: String,
        required: true
    },
    games: [{
        type: String,
        default: "Ninguno fue brindado"
    }],
    reason: {
        type: String,
        required: true
    },
    accusedDefense: {
        type: String,
        default: "Todavia no dijo nada"
    },
    status: {
        type: String,
        enum:["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
    positiveVotes: {
        type: Number,
        default: 0
    },
    negativeVotes: {
        type: Number,
        default: 0
    },
    alreadyVoted: [{
        type: String
    }],
    lastEdit: {
        type: String,
        default: "Nadie edito nada todavia"
    },
    lastVote: {
        type: String,
        "default": "Nadie voto todavia"
    }
}, { timestamps: true })

const Petition = mongoose.model("Petition", petitionSchema);

module.exports = Petition;