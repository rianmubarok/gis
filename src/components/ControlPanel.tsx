"use client";

import { Search, Filter, Layers, ChevronDown, X } from "lucide-react";

const ControlPanel = () => {
    return (
        <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col z-40 shadow-lg">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">SIG Jambu Timur</h1>
                <p className="text-sm text-gray-500 mt-1">Infrastruktur & Fasilitas</p>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari lokasi..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Layers */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Layer Pemetaan
                        </h2>
                        <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Reset</button>
                    </div>

                    <div className="space-y-2">
                        {[
                            "Kantor Desa",
                            "Sekolah",
                            "Masjid & Mushola",
                            "Posyandu",
                            "Lapangan Desa",
                            "Jalan Utama",
                            "Jembatan",
                            "Pasar"
                        ].map((layer) => (
                            <label key={layer} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900">{layer}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filter Kondisi
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {["Baik", "Rusak Ringan", "Rusak Berat"].map((status) => (
                            <button key={status} className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    Terapkan Filter
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;
