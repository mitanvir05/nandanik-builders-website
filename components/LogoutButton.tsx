"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all text-sm font-semibold cursor-pointer"
    >
      <FiLogOut size={16} />
      <span>Logout</span>
    </button>
  );
}