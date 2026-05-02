import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Secure the page on the server
  const session = await getServerSession(authOptions);

  if (!session) {
  redirect("/admin/login"); // ✅ FIXED
}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* FIX: Link to /dashboard, not /admin */}
          <Link href="/admin" className="flex items-center space-x-1 cursor-pointer">
            <span className="text-xl font-bold text-slate-900 tracking-tight">NANDANIK</span>
            <span className="text-xl font-light text-blue-600 tracking-tight">.ADMIN</span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <Link 
              href="/" 
              className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm font-semibold cursor-pointer"
            >
              <FiHome size={16} />
              <span className="hidden xs:block">Go to Home</span>
            </Link>

            <span className="text-sm font-medium text-slate-400 hidden md:block">|</span>

            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}