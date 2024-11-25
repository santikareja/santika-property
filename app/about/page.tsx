import { Metadata } from "next";
import Image from "next/image";
import { Building2, Users2, Award, ThumbsUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami - Santika Property",
  description: "Pelajari lebih lanjut tentang Santika Property dan komitmen kami dalam industri properti.",
};

const stats = [
  {
    label: "Tahun Pengalaman",
    value: "10+",
  },
  {
    label: "Properti Terjual",
    value: "500+",
  },
  {
    label: "Klien Puas",
    value: "1000+",
  },
  {
    label: "Kota",
    value: "5+",
  },
];

const values = [
  {
    icon: Building2,
    title: "Kualitas Terbaik",
    description: "Kami hanya menawarkan properti berkualitas yang telah melalui proses seleksi ketat.",
  },
  {
    icon: Users2,
    title: "Layanan Profesional",
    description: "Tim profesional kami siap membantu Anda menemukan properti impian.",
  },
  {
    icon: Award,
    title: "Terpercaya",
    description: "Komitmen kami untuk transparansi dan kejujuran dalam setiap transaksi.",
  },
  {
    icon: ThumbsUp,
    title: "Kepuasan Klien",
    description: "Kepuasan klien adalah prioritas utama dalam setiap layanan kami.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tentang Santika Property
            </h1>
            <p className="text-lg text-gray-200">
              Membantu Anda menemukan properti impian sejak 2014
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Santika Property didirikan pada tahun 2014 dengan visi untuk menjadi
                  perusahaan properti terpercaya yang mengutamakan kualitas dan
                  kepuasan klien.
                </p>
                <p>
                  Selama lebih dari satu dekade, kami telah membantu ribuan keluarga
                  menemukan rumah impian mereka dan membantu investor dalam
                  mengembangkan portofolio properti mereka.
                </p>
                <p>
                  Dengan tim profesional yang berpengalaman dan jaringan yang luas,
                  kami berkomitmen untuk memberikan layanan terbaik dan solusi
                  properti yang sesuai dengan kebutuhan setiap klien.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
                alt="Santika Property Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <value.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Didukung oleh tim profesional yang berpengalaman dan berkomitmen untuk
              memberikan layanan terbaik kepada setiap klien.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={`https://i.pravatar.cc/400?img=${member + 10}`}
                    alt="Team Member"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">Senior Property Consultant</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}