import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true
    },

    bestEssayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Essay"
    },

    bestScore: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
});

export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);