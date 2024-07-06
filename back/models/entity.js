import mongoose from "mongoose";

const entitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    marketShare: {
      type: Number,
      required: true,
    },
    renewableEnergy: {
      type: Number,
      required: true,
    },
    yearlyRevenue: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Посилання на модель User
      required: true,
    },
  },
  {
    timestamps: true, // Автоматично управляти полями createdAt та updatedAt
  }
);

export default mongoose.model("Entity", entitySchema);
