<content>"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Check auth cookie on client side
    const cookies = document.cookie;
    const isAuthenticated = cookies.includes("santika_auth");

    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return null; // No need to render anything as we're redirecting
}</content>