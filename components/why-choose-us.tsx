import { Building2, Shield, ThumbsUp, Users2 } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Properti Berkualitas",
    description: "Kami hanya menawarkan properti terbaik yang telah melalui proses seleksi ketat.",
  },
  {
    icon: Shield,
    title: "Transaksi Aman",
    description: "Jaminan keamanan dalam setiap transaksi properti yang Anda lakukan.",
  },
  {
    icon: Users2,
    title: "Tim Profesional",
    description: "Didukung oleh tim profesional yang siap membantu Anda 24/7.",
  },
  {
    icon: ThumbsUp,
    title: "Layanan Terpercaya",
    description: "Lebih dari 1000+ klien puas dengan layanan kami.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Kami?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Santika Property hadir dengan komitmen memberikan layanan terbaik untuk membantu Anda
            menemukan properti impian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}