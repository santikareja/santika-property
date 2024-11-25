"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function WhatsAppButton() {
  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg z-50 p-0"
      onClick={() => {
        window.open('https://wa.me/6282114812842', '_blank');
      }}
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
}