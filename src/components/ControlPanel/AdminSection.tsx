"use client";

import { User, Shield, LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AdminSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setIsAdmin(!!session);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-xs text-gray-500">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        {isAdmin ? (
          <>
            <Shield className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs font-semibold text-gray-900">
              Status: Admin
            </span>
          </>
        ) : (
          <>
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">
              Status: Pengunjung
            </span>
          </>
        )}
      </div>
      <Link
        href="/admin"
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        {isAdmin ? (
          <>
            <Shield className="w-3.5 h-3.5" />
            <span>Dashboard Admin</span>
          </>
        ) : (
          <>
            <LogIn className="w-3.5 h-3.5" />
            <span>Masuk ke Admin</span>
          </>
        )}
      </Link>
    </div>
  );
};
