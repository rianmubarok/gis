"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Save } from "lucide-react";
import {
  PageHeader,
  Card,
  LocationForm,
  defaultLocationFormValues,
  LocationFormValues,
  LocationFormCategory,
} from "@/components/Admin";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";

export default function CreateLocationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*, subcategories(*)");

    if (error) throw error;
    return (data || []) as LocationFormCategory[];
  }, []);

  const { data: categoriesData } =
    useSupabaseQuery<LocationFormCategory[]>(fetchCategories);
  const categories = categoriesData || [];

  const handleSubmit = async (values: LocationFormValues) => {
    setSubmitting(true);

    try {
      const { data: locationData, error: locationError } = await supabase
        .from("locations")
        .insert([
          {
            name: values.name,
            category_id: values.category_id || null,
            subcategory_id: values.subcategory_id || null,
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude),
            address: values.address,
            dusun: values.dusun,
            contact: values.contact,
            description: values.description,
            condition: values.condition,
          },
        ])
        .select()
        .single();

      if (locationError) throw locationError;

      if (values.images.length > 0 && locationData) {
        const imageInserts = values.images.map((url) => ({
          location_id: locationData.id,
          image_url: url,
        }));

        const { error: imagesError } = await supabase
          .from("location_images")
          .insert(imageInserts);

        if (imagesError) throw imagesError;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error creating location:", error);
      alert("Gagal menambahkan lokasi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Tambah Lokasi Baru"
        description="Isi formulir di bawah untuk menambahkan data lokasi."
        backHref="/admin"
      />

      <Card className="max-w-3xl">
        <LocationForm
          initialValues={defaultLocationFormValues}
          categories={categories}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Simpan Lokasi"
          submittingLabel="Menyimpan..."
          submitIcon={<Save className="w-4 h-4" />}
          cancelHref="/admin"
          manageCategoriesHref="/admin/categories"
        />
      </Card>
    </div>
  );
}
