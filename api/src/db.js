const mongoose = require("mongoose");
require("dotenv").config();
const { USER, PASSWORD, SERVER, DATABASE } = process.env;

const connDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${SERVER}/${DATABASE}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MONGODB connected!")
    } catch (err) {
        console.log("Failed to connecto MONGODB", err)
    }
};

module.exports = connDB