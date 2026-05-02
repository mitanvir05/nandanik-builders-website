import Link from "next/link";
import { FiImage } from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Command Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/admin/carousel"
          className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-shadow group cursor-pointer"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <FiImage size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Manage Carousel</h2>
          <p className="text-slate-500 text-sm mt-1">Update your homepage hero slides and images.</p>
        </Link>
      </div>
    </div>
  );
}