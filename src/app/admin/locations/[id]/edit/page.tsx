"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Save } from "lucide-react";
import {
  PageHeader,
  Card,
  Button,
  LinkButton,
  FormField,
  Input,
  Select,
  Textarea,
  LoadingState,
} from "@/components/Admin";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
}

export default function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    subcategory_id: "",
    latitude: "",
    longitude: "",
    address: "",
    dusun: "",
    contact: "",
    description: "",
    condition: "Baik",
  });

  useEffect(() => {
    Promise.all([fetchCategories(), fetchLocation()]);
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*, subcategories(*)");

      if (error) throw error;
      if (data) setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchLocation = async () => {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          category_id: data.category_id || "",
          subcategory_id: data.subcategory_id || "",
          latitude: data.latitude.toString(),
          longitude: data.longitude.toString(),
          address: data.address || "",
          dusun: data.dusun || "",
          contact: data.contact || "",
          description: data.description || "",
          condition: data.condition || "Baik",
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Gagal memuat data lokasi.");
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from("locations")
        .update({
          name: formData.name,
          category_id: formData.category_id || null,
          subcategory_id: formData.subcategory_id || null,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          address: formData.address,
          dusun: formData.dusun,
          contact: formData.contact,
          description: formData.description,
          condition: formData.condition,
        })
        .eq("id", id);

      if (error) throw error;

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error updating location:", error);
      alert("Gagal memperbarui lokasi.");
    } finally {
      setSaving(false);
    }
  };

  const selectedCategory = categories.find(
    (c) => c.id === formData.category_id
  );

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <PageHeader
        title="Edit Lokasi"
        description="Perbarui informasi lokasi."
        backHref="/admin"
      />

      <Card className="max-w-3xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Nama Lokasi" required>
              <Input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Kondisi">
              <Select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
              </Select>
            </FormField>

            <FormField label="Kategori">
              <Select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Sub Kategori">
              <Select
                name="subcategory_id"
                value={formData.subcategory_id}
                onChange={handleChange}
                disabled={!selectedCategory}
              >
                <option value="">Pilih Sub Kategori</option>
                {selectedCategory?.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Dusun">
              <Input
                type="text"
                name="dusun"
                value={formData.dusun}
                onChange={handleChange}
                placeholder="Nama Dusun"
              />
            </FormField>

            <FormField label="Kontak / No. HP">
              <Input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
              />
            </FormField>

            <FormField label="Latitude" required>
              <Input
                type="number"
                name="latitude"
                step="any"
                required
                value={formData.latitude}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Longitude" required>
              <Input
                type="number"
                name="longitude"
                step="any"
                required
                value={formData.longitude}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <FormField label="Alamat Lengkap">
            <Textarea
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Deskripsi">
            <Textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </FormField>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <LinkButton href="/admin" variant="secondary">
              Batal
            </LinkButton>
            <Button type="submit" disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
