"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function SEOManager() {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [googleVerification, setGoogleVerification] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // API implementation will be added later
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Pengaturan SEO berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan pengaturan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Pengaturan SEO</h2>

      <div className="space-y-6 rounded-lg border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Enter meta title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Enter meta description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="googleVerification">
            Google Site Verification Code
          </Label>
          <Input
            id="googleVerification"
            value={googleVerification}
            onChange={(e) => setGoogleVerification(e.target.value)}
            placeholder="Enter verification code"
          />
        </div>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
}