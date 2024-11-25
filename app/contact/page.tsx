import { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak - Santika Property",
  description: "Hubungi kami untuk informasi lebih lanjut tentang properti impian Anda.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-muted-foreground">
            Tim kami siap membantu Anda menemukan properti impian
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center p-6 rounded-lg border bg-card">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Alamat</h3>
            <p className="text-muted-foreground">
              Jalan Emas Raya No 23
              <br />
              Karawaci, Tangerang
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border bg-card">
            <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Telepon</h3>
            <p className="text-muted-foreground">
              <a href="tel:+6282114812842" className="hover:text-primary">
                +62 821 1481 2842
              </a>
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border bg-card">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-muted-foreground">
              <a 
                href="https://wa.me/6282114812842"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                +62 821 1481 2842
              </a>
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border bg-card">
            <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">
              <a href="mailto:info@santikaproperty.com" className="hover:text-primary">
                info@santikaproperty.com
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          
          <div className="rounded-lg overflow-hidden h-[400px] bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Peta akan segera tersedia</p>
          </div>
        </div>
      </div>
    </div>
  );
}