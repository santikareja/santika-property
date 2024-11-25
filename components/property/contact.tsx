"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  message: z.string().min(1, "Pesan wajib diisi"),
});

interface PropertyContactProps {
  propertyId: string;
  title: string;
}

export default function PropertyContact({
  propertyId,
  title,
}: PropertyContactProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setLoading(true);
    try {
      // API implementation will be added later
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Pesan berhasil dikirim");
      reset();
    } catch (error) {
      toast.error("Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Tertarik dengan properti ini?</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            placeholder="Nama Lengkap"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Nomor Telepon"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Pesan"
            {...register("message")}
            defaultValue={`Saya tertarik dengan properti "${title}"`}
          />
          {errors.message && (
            <p className="text-sm text-destructive mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </Button>
      </form>
    </div>
  );
}