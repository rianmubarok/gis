"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Edit, Trash2, MapPin, Folder } from "lucide-react";
import Link from "next/link";
import {
  PageHeader,
  Card,
  CardHeader,
  EmptyState,
  LoadingState,
  LinkButton,
  Badge,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/Admin";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  condition: string | null;
  category: {
    name: string;
  } | null;
  created_at: string;
  updated_at?: string;
}

export default function AdminDashboard() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select(
          `
          id,
          name,
          latitude,
          longitude,
          condition,
          created_at,
          updated_at,
          category:categories(name)
        `
        )
        .order("updated_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedData = data.map((item) => ({
          ...item,
          category: Array.isArray(item.category)
            ? item.category[0]
            : item.category,
        }));
        setLocations(formattedData);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus lokasi ini?")) return;

    try {
      const { error } = await supabase.from("locations").delete().eq("id", id);

      if (error) throw error;
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Gagal menghapus lokasi.");
    }
  };

  const getConditionBadge = (condition: string | null) => {
    switch (condition) {
      case "Baik":
        return <Badge variant="green">Baik</Badge>;
      case "Rusak Ringan":
        return <Badge variant="yellow">Rusak Ringan</Badge>;
      case "Rusak Berat":
        return <Badge variant="red">Rusak Berat</Badge>;
      default:
        return <Badge variant="gray">-</Badge>;
    }
  };

  return (
    <div>
      <PageHeader
        title="Dashboard Admin"
        description="Kelola data spasial dan informasi infrastruktur desa."
        action={
          <div className="flex gap-3">
            <LinkButton href="/admin/categories" variant="secondary">
              <Folder className="w-4 h-4" />
              Kategori
            </LinkButton>
            <LinkButton href="/admin/locations/create">
              <Plus className="w-4 h-4" />
              Tambah Lokasi
            </LinkButton>
          </div>
        }
      />

      <Card>
        <CardHeader title="Daftar Lokasi" />

        {loading ? (
          <LoadingState />
        ) : locations.length === 0 ? (
          <EmptyState
            icon={<MapPin className="w-7 h-7 text-blue-600" />}
            title="Belum ada data lokasi"
            description="Mulai dengan menambahkan lokasi baru untuk dipetakan."
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Nama Lokasi</TableHeader>
                <TableHeader>Kategori</TableHeader>
                <TableHeader>Kondisi</TableHeader>
                <TableHeader>Koordinat</TableHeader>
                <TableHeader>Terakhir Diperbarui</TableHeader>
                <TableHeader className="text-right">Aksi</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium text-gray-900">
                    {location.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="blue">
                      {location.category?.name || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell>{getConditionBadge(location.condition)}</TableCell>
                  <TableCell className="text-gray-500 font-mono text-xs">
                    {location.latitude.toFixed(5)},{" "}
                    {location.longitude.toFixed(5)}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(location.updated_at || location.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/locations/${location.id}/edit`}>
                        <IconButton>
                          <Edit className="w-4 h-4" />
                        </IconButton>
                      </Link>
                      <IconButton
                        variant="danger"
                        onClick={() => handleDelete(location.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
