"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import PropertiesManager from "./properties-manager";
import BlogManager from "./blog-manager";
import BlogScheduler from "./blog-scheduler";
import UsersManager from "./users-manager";
import SEOManager from "./seo-manager";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      toast.success("Berhasil logout");
    } catch (error) {
      toast.error("Gagal logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="properties">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="properties">Properti</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="scheduler">Blog Scheduler</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <PropertiesManager />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>

        <TabsContent value="scheduler">
          <BlogScheduler />
        </TabsContent>

        <TabsContent value="users">
          <UsersManager />
        </TabsContent>

        <TabsContent value="seo">
          <SEOManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}