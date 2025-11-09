const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    time: { // original input string (optional but useful for UI)
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "completed", "available", "requested"],
        default: "pending"
    },

   
   
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("RideRequests", rideSchema);
