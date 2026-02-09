import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Shield, Timer } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "House Removals",
  serviceType: "House Removals",
  url: "https://kaithanlogistics.co.uk/services/house-removals",
  description:
    "Professional house removals across Falkirk and Central Scotland with careful packing, safe transport, and friendly support.",
  provider: {
    "@type": "LocalBusiness",
    name: "Kaithan Logistics",
    url: "https://kaithanlogistics.co.uk",
    telephone: "+44-7459-920-895",
  },
  areaServed: [
    { "@type": "City", name: "Falkirk" },
    { "@type": "City", name: "Glasgow" },
    { "@type": "City", name: "Edinburgh" },
    { "@type": "City", name: "Stirling" },
  ],
};

export default function ServiceHouseRemovals() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="House Removals in Falkirk & Central Scotland | Kaithan Logistics"
        description="Stress-free house removals with packing, careful loading, and safe delivery. Falkirk-based team serving Glasgow, Edinburgh, Stirling and beyond."
        canonicalPath="/services/house-removals"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">House Removals</p>
              <h1 className="mb-6">A Calm, Well-Organised Home Move</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Moving house is a big moment. Our Falkirk-based team makes it simple with clear planning, careful
                handling, and friendly support from start to finish.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Our house removal service is designed for busy families, professionals, and anyone who wants a move
                without the stress. We start with a quick consultation to understand your inventory, access details,
                and preferred times. From there we build a plan that fits your schedule and budget, whether you need
                a full move or help with the heavy items.
              </p>
              <p>
                On moving day we arrive on time, protect doorways and floors, and load with care. We can provide
                packing materials, wrap fragile items, and disassemble larger furniture so it travels safely. Once
                we arrive at your new address, we place items where you need them and reassemble furniture so your
                home is ready to settle into.
              </p>
              <p>
                We cover Falkirk, Stirling, Glasgow, Edinburgh, and the wider Central Scotland area. Whether it’s a
                flat, a family home, or a multi-storey property, you get the same careful service and clear pricing.
                There are no hidden fees and we’ll always confirm what’s included before the job starts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Dedicated move coordinator",
                  "Protective blankets and straps",
                  "Furniture dismantle and reassemble",
                  "Weekend and evening slots",
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
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=700&fit=crop"
                alt="Family moving boxes into a home"
                className="w-full h-44 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex items-center gap-3">
                <Home className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">What You Get</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary mt-1" />
                  Fully insured move with goods-in-transit cover.
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="w-4 h-4 text-primary mt-1" />
                  Reliable arrival times and clear time windows.
                </li>
              </ul>
              <Button asChild size="lg" className="w-full">
                <Link href="/quote">Get a Free Quote</Link>
              </Button>
              <p className="text-xs text-muted-foreground font-light">
                Need a same-day slot? Call 07459 920 895 and we’ll check availability.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
