import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      reqaired: true,
    },

    email: {
      type: String,
      reqaired: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      reqaired: true,
    },
    avatarURL: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
