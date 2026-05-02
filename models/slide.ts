import mongoose, { Schema, models } from "mongoose";

const SlideSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageId: { type: String }, // Used for deleting from Cloudinary later
    isFeatured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// This checks if the model already exists to prevent OverwriteModelError during hot-reloads
const Slide = models.Slide || mongoose.model("Slide", SlideSchema);

export default Slide;