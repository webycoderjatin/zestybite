const mongoose = require("mongoose")

const Partners = new mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    email: String,
    dateOfBirth: String,
    haveTwoWheeler: String,
    areaOfOperation: String,

})

module.exports = mongoose.model("PartnerApplications" , Partners)