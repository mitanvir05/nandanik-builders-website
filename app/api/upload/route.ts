import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Debugging: This will log to your terminal (not browser)
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error("Cloudinary environment variables are missing!");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert to Base64
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Secure Upload
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: "nandanik_carousel",
      resource_type: "auto", // This helps Cloudinary detect the file type automatically
    });

    return NextResponse.json({
      secure_url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
    
  } catch (error: any) {
    // This log is CRITICAL. It will show the real Cloudinary error in your terminal.
    console.error("Cloudinary Upload Error Details:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}