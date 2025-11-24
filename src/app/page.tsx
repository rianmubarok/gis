"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import ControlPanel from "@/components/ControlPanel";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 flex items-center justify-center">Loading Map...</div>,
});

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <ControlPanel />
      <div className="flex-1 h-full relative">
        <Map />

        {/* Floating Action Button for Mobile (Optional) */}
        {/* <button className="absolute bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-[1000]">
          <Plus className="w-6 h-6" />
        </button> */}
      </div>
    </main>
  );
}
