"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@/lib/supabase";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    properties: true,
    blog: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/user/notification-settings");
        const data = await response.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch (error) {
        toast.error("Gagal memuat pengaturan notifikasi");
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch("/api/user/notification-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      toast.success("Pengaturan notifikasi berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan pengaturan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-xl font-semibold mb-6">Pengaturan Notifikasi</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email">Email Notifikasi</Label>
            <p className="text-sm text-muted-foreground">
              Terima update properti melalui email
            </p>
          </div>
          <Switch
            id="email"
            checked={settings.email}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, email: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push">Push Notifikasi</Label>
            <p className="text-sm text-muted-foreground">
              Terima notifikasi langsung di browser
            </p>
          </div>
          <Switch
            id="push"
            checked={settings.push}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, push: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="properties">Update Properti</Label>
            <p className="text-sm text-muted-foreground">
              Properti baru yang sesuai preferensi
            </p>
          </div>
          <Switch
            id="properties"
            checked={settings.properties}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, properties: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="blog">Update Blog</Label>
            <p className="text-sm text-muted-foreground">
              Artikel dan insight terbaru
            </p>
          </div>
          <Switch
            id="blog"
            checked={settings.blog}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, blog: checked }))
            }
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
      </div>
    </div>
  );
}