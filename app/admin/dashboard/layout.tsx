<content>"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check auth cookie on client side
    const cookies = document.cookie;
    const isAuthenticated = cookies.includes("santika_auth");

    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}</content>