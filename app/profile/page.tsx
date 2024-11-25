import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ProfileSettings from "@/components/profile/settings";
import SavedProperties from "@/components/profile/saved-properties";
import NotificationSettings from "@/components/profile/notification-settings";

export const metadata: Metadata = {
  title: "Profile - Santika Property",
  description: "Kelola profil dan pengaturan akun Anda",
};

export default function ProfilePage() {
  const isAuthenticated = cookies().has("santika_auth");
  
  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profil Saya</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileSettings />
          <SavedProperties />
        </div>
        
        <div className="lg:col-span-1">
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}