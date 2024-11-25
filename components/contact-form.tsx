"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  subject: z.string().min(1, "Subjek wajib diisi"),
  message: z.string().min(1, "Pesan wajib diisi"),
});

export default function ContactForm() {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input
          id="name"
          {...register("name")}
          className="bg-background"
        />
        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="bg-background"
        />
        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Nomor Telepon</Label>
        <Input
          id="phone"
          {...register("phone")}
          className="bg-background"
        />
        {errors.phone && (
          <p className="text-sm text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subjek</Label>
        <Input
          id="subject"
          {...register("subject")}
          className="bg-background"
        />
        {errors.subject && (
          <p className="text-sm text-destructive">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          {...register("message")}
          rows={5}
          className="bg-background"
        />
        {errors.message && (
          <p className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </Button>
    </form>
  );
}