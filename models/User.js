const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarImage: { type: String, default: "https://res.cloudinary.com/dzqbzqgqw/image/upload/v1589788981/avatar_default_yqxzqw.png" },
    isAvatarImageSet: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);