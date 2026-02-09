import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, ShieldCheck, Truck } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Courier Services",
  serviceType: "Courier Services",
  url: "https://kaithanlogistics.co.uk/services/courier-services",
  description:
    "Same-day and scheduled courier services across Central Scotland. Secure transport, proof of delivery, and flexible time slots.",
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

export default function ServiceCourierServices() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Same-Day Courier Services | Kaithan Logistics"
        description="Fast courier and delivery services across Central Scotland. Same-day availability, proof of delivery, and safe handling for business and personal items."
        canonicalPath="/services/courier-services"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">Courier Services</p>
              <h1 className="mb-6">Fast, Reliable Delivery When Time Matters</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Our courier service keeps your deliveries on schedule with same-day availability, careful handling,
                and real-time updates across Central Scotland.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Businesses and individuals rely on us for urgent deliveries, scheduled drops, and sensitive items.
                We collect from homes, offices, and warehouses, then deliver directly to the destination without
                unnecessary stops. This reduces risk and improves turnaround times.
              </p>
              <p>
                Every courier job starts with clear requirements: item size, pickup time, and drop-off instructions.
                We confirm the route, provide accurate ETAs, and can supply proof of delivery on request. Whether it’s
                a one-off delivery or a regular route, our service adapts to your timeline.
              </p>
              <p>
                Our Falkirk-based team covers Glasgow, Edinburgh, Stirling, and the wider Central Scotland region.
                If you need evening or weekend delivery, we can often accommodate with advance notice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Same-day and scheduled delivery",
                  "Direct routes with secure handling",
                  "Proof of delivery available",
                  "Business accounts for regular routes",
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
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&h=700&fit=crop&q=80"
                alt="Courier organizing parcels in a van"
                className="w-full h-44 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Courier Highlights</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary mt-1" />
                  Fully insured delivery for peace of mind.
                </li>
                <li className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-primary mt-1" />
                  Large van for bulky or multiple items.
                </li>
              </ul>
              <Button asChild size="lg" className="w-full">
                <Link href="/quote">Book a Courier</Link>
              </Button>
              <p className="text-xs text-muted-foreground font-light">
                Call 07459 920 895 for urgent collections.
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
