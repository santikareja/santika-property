"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLogin() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (response.ok) {
        toast.success("Login berhasil");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        toast.error("Kunci admin tidak valid");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Masukkan kunci admin untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="key">Kunci Admin</Label>
            <Input
              id="key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}