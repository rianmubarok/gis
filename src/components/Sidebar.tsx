"use client";

import {
  Map as MapIcon,
  Menu,
  User,
  Layers,
  Settings,
  List,
  ChartColumnBig,
} from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { ViewType } from "@/constants";

interface SidebarProps {
  currentView?: ViewType;
  onViewChange?: (view: ViewType) => void;
  onPanelOpen?: () => void;
}

// Navigation items configuration
const NAV_ITEMS: { view: ViewType; icon: typeof Layers; title: string }[] = [
  { view: "layers", icon: Layers, title: "Layer & Filter" },
  { view: "list", icon: List, title: "Daftar Lokasi" },
  { view: "statistics", icon: ChartColumnBig, title: "Statistik" },
  { view: "admin", icon: User, title: "Admin" },
];

const Sidebar = ({
  currentView = "layers",
  onViewChange,
  onPanelOpen,
}: SidebarProps) => {
  const handleClick = useCallback(
    (view: ViewType) => {
      onViewChange?.(view);
      // Always request panel open when any icon is clicked
      onPanelOpen?.();
    },
    [onViewChange, onPanelOpen]
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-50 shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="mb-8 p-2 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
      >
        <MapIcon className="text-white w-6 h-6" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-6 w-full items-center">
        {NAV_ITEMS.map(({ view, icon: Icon, title }) => (
          <button
            key={view}
            onClick={() => handleClick(view)}
            className={`p-3 rounded-xl transition-colors cursor-pointer ${currentView === view
                ? "bg-blue-50 text-blue-600"
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            title={title}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-6 w-full items-center">
        {/* Settings */}
        <button
          onClick={() => handleClick("settings")}
          className={`p-3 rounded-xl transition-colors cursor-pointer ${currentView === "settings"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            }`}
          title="Pengaturan"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Menu Button */}
        <button className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
