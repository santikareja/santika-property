"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, updateUser } from "@/lib/supabase";
import { UserCircle } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
});

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          form.reset({
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone || "",
          });
        }
      } catch (error) {
        toast.error("Gagal memuat data profil");
      }
    };

    fetchUserData();
  }, [form]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updatedUser = await updateUser(user.id, data);
      setUser(updatedUser);
      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      toast.error("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-xl font-semibold mb-6">Pengaturan Profil</h2>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="h-20 w-20 text-muted-foreground" />
          )}
          <Button
            size="sm"
            className="absolute bottom-0 right-0"
            onClick={() => toast.info("Fitur upload foto profil akan segera hadir")}
          >
            Ubah
          </Button>
        </div>
        <div>
          <h3 className="font-medium">{user?.name}</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input id="phone" {...form.register("phone")} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}