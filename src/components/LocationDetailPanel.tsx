import { X, MapPin, Phone, Info, Tag, AlertTriangle } from "lucide-react";
import { Location, Category } from "@/types";
import { useMemo } from "react";

interface LocationDetailPanelProps {
    location: Location | null;
    categories: Category[];
    onClose: () => void;
}

export const LocationDetailPanel = ({
    location,
    categories,
    onClose,
}: LocationDetailPanelProps) => {
    const categoryName = useMemo(() => {
        if (!location?.category_id) return "-";
        const category = categories.find((c) => c.id === location.category_id);
        return category?.name || "-";
    }, [location, categories]);

    const subcategoryName = useMemo(() => {
        if (!location?.category_id || !location?.subcategory_id) return "-";
        const category = categories.find((c) => c.id === location.category_id);
        const subcategory = category?.subcategories.find(
            (s) => s.id === location.subcategory_id
        );
        return subcategory?.name || "-";
    }, [location, categories]);

    if (!location) return null;

    return (
        <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-xl z-[1000] overflow-y-auto border-l border-gray-200 transform transition-transform duration-300 ease-in-out">
            {/* Header with Image placeholder or Map preview could go here */}
            <div className="bg-blue-600 p-6 text-white relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 hover:bg-blue-700 rounded-full transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold pr-8">{location.name}</h2>
                <p className="text-blue-100 text-sm mt-1">{categoryName}</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Status/Condition Badge */}
                {location.condition && (
                    <div className="flex items-center gap-2">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${location.condition === "Baik"
                                ? "bg-green-100 text-green-700"
                                : location.condition === "Rusak Ringan"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {location.condition}
                        </span>
                    </div>
                )}

                {/* Address Section */}
                <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Alamat</p>
                            <p className="text-sm text-gray-600 mt-0.5">
                                {location.address || "-"}
                            </p>
                            {location.dusun && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Dusun: {location.dusun}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-600">
                        <Info className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Deskripsi</p>
                            <p className="text-sm text-gray-600 mt-0.5">
                                {location.description || "-"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Sub Kategori</p>
                            <p className="text-sm font-medium text-gray-900">
                                {subcategoryName}
                            </p>
                        </div>
                    </div>

                    {location.contact && (
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500">Kontak</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {location.contact}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Images Section */}
                {location.images && location.images.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Foto Lokasi</p>
                        <div className="grid grid-cols-2 gap-2">
                            {location.images.map((url, index) => (
                                <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.open(url, '_blank')}>
                                    <img
                                        src={url}
                                        alt={`${location.name} - ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Coordinates */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-mono">
                        {location.latitude}, {location.longitude}
                    </p>
                </div>
            </div>
        </div>
    );
};
