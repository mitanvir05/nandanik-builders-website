"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiTrash2,
  FiPlus,
  FiX,
  FiUploadCloud,
  FiEdit2,
} from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast"; // <-- 1. Imported Toast
import {
  getSlides,
  toggleFeatured,
  updateSlideOrder,
  deleteSlide,
  addSlide,
  updateSlide,
} from "@/actions/carousel.actions";

export default function CarouselManager() {
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    imageId: "",
  });

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      const data = await getSlides();
      setSlides(data);
    } catch (error) {
      toast.error("Failed to load slides.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);

    // Optional: Show a loading toast for upload
    const uploadToast = toast.loading("Uploading image...");

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: data.secure_url,
          imageId: data.public_id,
        }));
        toast.success("Image uploaded!", { id: uploadToast });
      } else {
        toast.error("Upload failed: " + data.error, { id: uploadToast });
      }
    } catch (error) {
      toast.error("Something went wrong during upload.", { id: uploadToast });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleEditClick = (slide: any) => {
    setFormData({
      title: slide.title,
      description: slide.description,
      imageUrl: slide.imageUrl,
      imageId: slide.imageId || "",
    });
    setEditingId(slide._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", description: "", imageUrl: "", imageId: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return toast.error("Please upload an image first.");
    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateSlide(editingId, formData);
        toast.success("Slide updated successfully!");
      } else {
        await addSlide(formData);
        toast.success("New slide added successfully!");
      }
      closeModal();
      loadSlides();
    } catch (error) {
      toast.error("Failed to save slide.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveSlide = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === slides.length - 1)
    )
      return;
    const newSlides = [...slides];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newSlides[index], newSlides[swapIndex]] = [
      newSlides[swapIndex],
      newSlides[index],
    ];
    const updatedOrder = newSlides.map((slide, i) => ({ ...slide, order: i }));
    setSlides(updatedOrder);

    try {
      await updateSlideOrder(
        updatedOrder.map((s) => ({ _id: s._id, order: s.order })),
      );
      // Note: Omitted toast here so it doesn't get annoying when clicking fast, but you can add one!
    } catch (error) {
      toast.error("Failed to update order.");
      loadSlides(); // Revert on failure
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-slate-500 font-medium text-center">
        Loading carousel data...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 2. ADD TOASTER HERE */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Manage Carousel
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Add, reorder, and feature slides for the homepage.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm cursor-pointer"
        >
          <FiPlus size={18} />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Mobile View: Card List */}
      <div className="block md:hidden space-y-4">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex gap-4">
              <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">
                  {slide.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {slide.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => moveSlide(index, "up")}
                  disabled={index === 0}
                  className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer disabled:opacity-20"
                >
                  <FiArrowUp size={18} />
                </button>
                <span className="text-sm font-bold w-4 text-center">
                  {index + 1}
                </span>
                <button
                  onClick={() => moveSlide(index, "down")}
                  disabled={index === slides.length - 1}
                  className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer disabled:opacity-20"
                >
                  <FiArrowDown size={18} />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={async () => {
                    try {
                      setSlides(
                        slides.map((s) =>
                          s._id === slide._id
                            ? { ...s, isFeatured: !s.isFeatured }
                            : s,
                        ),
                      );
                      await toggleFeatured(slide._id, slide.isFeatured);
                      toast.success(
                        slide.isFeatured ? "Slide hidden" : "Slide featured",
                      );
                    } catch (error) {
                      toast.error("Update failed.");
                    }
                  }}
                  className={`p-2 rounded-lg cursor-pointer ${slide.isFeatured ? "text-blue-600 bg-blue-50" : "text-gray-400 bg-gray-50"}`}
                >
                  <FiStar
                    className={slide.isFeatured ? "fill-current" : ""}
                    size={18}
                  />
                </button>
                <button
                  onClick={() => handleEditClick(slide)}
                  className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg cursor-pointer"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={async () => {
                    if (confirm("Delete this slide?")) {
                      try {
                        setSlides(slides.filter((s) => s._id !== slide._id));
                        await deleteSlide(slide._id);
                        toast.success("Slide deleted successfully!");
                      } catch (error) {
                        toast.error("Failed to delete slide.");
                      }
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="p-4 w-24 text-center">Order</th>
              <th className="p-4 w-32">Image</th>
              <th className="p-4">Content</th>
              <th className="p-4 w-32 text-center">Featured</th>
              <th className="p-4 w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slides.map((slide, index) => (
              <tr
                key={slide._id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="p-4">
                  <div className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => moveSlide(index, "up")}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 cursor-pointer"
                    >
                      <FiArrowUp size={16} />
                    </button>
                    <span className="text-sm font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <button
                      onClick={() => moveSlide(index, "down")}
                      disabled={index === slides.length - 1}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 cursor-pointer"
                    >
                      <FiArrowDown size={16} />
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <div className="relative w-24 h-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mt-1 pr-4">
                    {slide.description}
                  </p>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={async () => {
                      try {
                        setSlides(
                          slides.map((s) =>
                            s._id === slide._id
                              ? { ...s, isFeatured: !s.isFeatured }
                              : s,
                          ),
                        );
                        await toggleFeatured(slide._id, slide.isFeatured);
                        toast.success(
                          slide.isFeatured ? "Slide hidden" : "Slide featured",
                        );
                      } catch (error) {
                        toast.error("Update failed.");
                      }
                    }}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-shadow cursor-pointer ${
                      slide.isFeatured
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    <FiStar
                      className={slide.isFeatured ? "fill-current" : ""}
                      size={12}
                    />
                    <span>{slide.isFeatured ? "Featured" : "Hidden"}</span>
                  </button>
                </td>
                <td className="p-4 text-center">
                  {/* 3. FIX: Removed opacity-0 and group-hover:opacity-100 so buttons are always visible */}
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleEditClick(slide)}
                      className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Slide"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Delete?")) {
                          try {
                            setSlides(
                              slides.filter((s) => s._id !== slide._id),
                            );
                            await deleteSlide(slide._id);
                            toast.success("Slide deleted!");
                          } catch (error) {
                            toast.error("Failed to delete slide.");
                          }
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Slide"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {slides.length === 0 && (
        <div className="p-12 text-center text-slate-500 text-sm bg-white rounded-xl border border-gray-200 border-dashed mt-4">
          No slides found. Click "Add New Slide" to get started.
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Slide" : "Add New Slide"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Slide Image
                </label>
                {formData.imageUrl ? (
                  <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden border border-gray-200 group">
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, imageUrl: "", imageId: "" })
                      }
                      className="absolute inset-0 bg-slate-900/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold cursor-pointer"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-32 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center text-blue-600 bg-blue-50/30 hover:bg-blue-50 transition-colors overflow-hidden cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <FiUploadCloud
                      size={28}
                      className="mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {isUploadingImage ? "Uploading..." : "Upload Image"}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Slide Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-shadow text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Slide description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-shadow text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting || !formData.imageUrl || isUploadingImage
                  }
                  className="flex-[2] py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-shadow shadow-md cursor-pointer"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                      ? "Update Slide"
                      : "Save Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
