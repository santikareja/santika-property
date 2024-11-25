import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Siap Menemukan Properti Impian Anda?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Tim profesional kami siap membantu Anda menemukan properti yang sesuai
          dengan kebutuhan dan budget Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link href="/contact">Hubungi Kami</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            <a href="tel:+6281234567890">
              <Phone className="mr-2 h-4 w-4" />
              +62 812 3456 7890
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}