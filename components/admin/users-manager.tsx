"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { User, fetchUsers, createUser, updateUser, deleteUser } from "@/lib/supabase";

const userSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  role: z.enum(["admin", "agent", "user"]),
  phone: z.string().optional(),
});

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user" as const,
      phone: "",
    },
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Gagal memuat daftar pengguna");
    }
  }

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setLoading(true);
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data);
        toast.success("Pengguna berhasil diperbarui");
      } else {
        await createUser({
          ...data,
          notification_preferences: {
            email: true,
            push: true,
            properties: true,
            blog: true,
          },
        });
        toast.success("Pengguna berhasil ditambahkan");
      }

      setIsOpen(false);
      form.reset();
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        await deleteUser(id);
        toast.success("Pengguna berhasil dihapus");
        loadUsers();
      } catch (error) {
        toast.error("Gagal menghapus pengguna");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Kelola Pengguna</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pengguna
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nama</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Role</th>
                <th className="text-left py-2">Telepon</th>
                <th className="text-left py-2">Tanggal Daftar</th>
                <th className="text-left py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2">
                    <div className="flex items-center space-x-2">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <UserCircle className="h-8 w-8 text-muted-foreground" />
                      )}
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>{user.phone || "-"}</td>
                  <td>
                    {new Date(user.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit Pengguna" : "Tambah Pengguna"}
            </DialogTitle>
          </DialogHeader>

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
              <Label htmlFor="role">Role</Label>
              <Select
                value={form.watch("role")}
                onValueChange={(value) => form.setValue("role", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" {...form.register("phone")} />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}