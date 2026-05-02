"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb"; 
import Slide from "@/models/slide";

export async function getSlides() {
  await connectDB();
  // Fetch slides and sort them by the 'order' field (ascending)
  const slides = await Slide.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(slides));
}

export async function toggleFeatured(id: string, currentStatus: boolean) {
  await connectDB();
  await Slide.findByIdAndUpdate(id, { isFeatured: !currentStatus });
  revalidatePath("/admin/carousel"); // Refresh admin page
  revalidatePath("/"); // Refresh homepage
}

export async function updateSlideOrder(slides: { _id: string; order: number }[]) {
  await connectDB();
  // Bulk update the order of multiple slides at once
  const bulkOps = slides.map((slide) => ({
    updateOne: {
      filter: { _id: slide._id },
      update: { order: slide.order },
    },
  }));
  
  await Slide.bulkWrite(bulkOps);
  revalidatePath("/admin/carousel");
  revalidatePath("/");
}

export async function deleteSlide(id: string) {
  await connectDB();
  await Slide.findByIdAndDelete(id);
  // Note: You would also trigger your Cloudinary destroy API here using the imageId
  revalidatePath("/admin/carousel");
  revalidatePath("/");
}



export async function addSlide(data: { title: string; description: string; imageUrl: string; imageId: string }) {
  await connectDB();
  
  // Count existing slides so we can place the new one at the end of the order
  const count = await Slide.countDocuments();
  
  const newSlide = new Slide({
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    imageId: data.imageId,
    order: count,
    isFeatured: true, // Default to featured
  });

  await newSlide.save();
  revalidatePath("/admin/carousel");
  revalidatePath("/");
}




export async function updateSlide(id: string, data: { title: string; description: string; imageUrl: string; imageId: string }) {
  await connectDB();
  
  await Slide.findByIdAndUpdate(id, {
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    imageId: data.imageId,
  });

  // Refresh both the admin panel and the public homepage to show the edits immediately
  revalidatePath("/admin/carousel");
  revalidatePath("/");
}