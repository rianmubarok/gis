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

    const coverImage = location?.images?.[0] || 'https://images.unsplash.com/photo-1764147385070-d0d45dfab547?q=80&w=1000&auto=format&fit=crop';

    if (!location) return null;

    return (
        <div className="fixed right-4 top-4 bottom-4 w-96 bg-white shadow-2xl z-[1000] overflow-y-auto rounded-2xl border border-gray-100 transform transition-transform duration-300 ease-in-out scrollbar-hide">
            {/* Cover Image */}
            <div className="relative h-56 w-full bg-gray-100">
                <img
                    src={coverImage}
                    alt={location.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                    <h2 className="text-2xl font-bold leading-tight mb-1">{location.name}</h2>
                    <p className="text-gray-200 text-sm font-medium">{categoryName}</p>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Status/Condition Badge */}
                {location.condition && (
                    <div className="flex items-center gap-2">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${location.condition === "Baik"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : location.condition === "Rusak Ringan"
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}
                        >
                            {location.condition}
                        </span>
                    </div>
                )}

                {/* Address Section */}
                <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Alamat</p>
                            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
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
                        <Info className="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Deskripsi</p>
                            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
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

                {/* Images Section (Gallery) */}
                {location.images && location.images.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Galeri Foto</p>
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

                {/* Coordinates and Last Updated */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-xs text-gray-400 font-mono">
                        {location.latitude}, {location.longitude}
                    </p>
                    {location.updated_at && (
                        <p className="text-xs text-gray-400">
                            Updated: {new Date(location.updated_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
