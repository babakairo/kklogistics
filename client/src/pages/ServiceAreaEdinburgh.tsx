import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Truck } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man with a Van Edinburgh",
  serviceType: "Man with a Van",
  url: "https://kaithanlogistics.co.uk/service-area/man-with-a-van-edinburgh",
  description:
    "Man with a van services for Edinburgh. House removals, furniture delivery, office moves, and courier services with trusted local support.",
  provider: {
    "@type": "LocalBusiness",
    name: "Kaithan Logistics",
    url: "https://kaithanlogistics.co.uk",
    telephone: "+44-7459-920-895",
  },
  areaServed: [{ "@type": "City", name: "Edinburgh" }],
};

export default function ServiceAreaEdinburgh() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Man with a Van Edinburgh | Kaithan Logistics"
        description="Reliable man with a van service in Edinburgh for home moves, furniture delivery, office relocations, and couriers."
        canonicalPath="/service-area/man-with-a-van-edinburgh"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">Service Area</p>
              <h1 className="mb-6">Man with a Van in Edinburgh</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                From Old Town flats to modern developments, we provide reliable removals, deliveries, and courier
                services across Edinburgh with flexible scheduling and clear pricing.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Edinburgh is one of our most requested destinations, and we know the city’s unique access challenges.
                We frequently serve Leith, Stockbridge, New Town, Marchmont, and the city centre, helping customers
                with house moves, furniture pickups, and office relocations. We plan routes to avoid delays and
                handle loading restrictions around historic streets.
              </p>
              <p>
                Whether you need a full house move, a marketplace furniture collection, or a same-day delivery for a
                business client, we tailor the service to your needs. Our team provides careful handling, protective
                wrapping, and clear time windows so you can plan your day with confidence.
              </p>
              <p>
                We’re based in Falkirk and travel to Edinburgh daily, so your booking is handled by a trusted local
                team. You can add packing help, disassembly, or after-hours slots for busy schedules.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Home removals and student moves",
                  "Furniture delivery from retailers",
                  "Office relocations across the city",
                  "Same-day and next-day courier options",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-pastel-blue mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop&q=80"
                alt="Moving truck servicing Edinburgh"
                className="w-full h-44 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Edinburgh Coverage</h3>
              </div>
              <p className="text-sm text-muted-foreground font-light">
                Serving Leith, New Town, Old Town, Stockbridge, Marchmont, and more.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link href="/quote">Get an Edinburgh Quote</Link>
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                Book early for weekend availability.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
