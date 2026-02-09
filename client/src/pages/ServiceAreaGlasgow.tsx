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
  name: "Man with a Van Glasgow",
  serviceType: "Man with a Van",
  url: "https://kaithanlogistics.co.uk/service-area/man-with-a-van-glasgow",
  description:
    "Local man with a van service for Glasgow. House moves, furniture delivery, office moves, and courier services with flexible scheduling.",
  provider: {
    "@type": "LocalBusiness",
    name: "Kaithan Logistics",
    url: "https://kaithanlogistics.co.uk",
    telephone: "+44-7459-920-895",
  },
  areaServed: [{ "@type": "City", name: "Glasgow" }],
};

export default function ServiceAreaGlasgow() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Man with a Van Glasgow | Kaithan Logistics"
        description="Fast, friendly man with a van service in Glasgow. House removals, furniture delivery, office moves, and courier services across the city."
        canonicalPath="/service-area/man-with-a-van-glasgow"
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
              <h1 className="mb-6">Man with a Van in Glasgow</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Need a reliable van team in Glasgow? We provide fast removals, furniture delivery, and courier
                services with flexible booking and local knowledge.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Glasgow moves require careful planning and local insight. We regularly work across the West End,
                City Centre, Southside, and East End, helping customers move homes, deliver furniture, and transport
                business equipment. Whether you’re in Finnieston, Partick, Shawlands, or Dennistoun, our team
                arrives on time and handles your items with care.
              </p>
              <p>
                We are based in Falkirk but travel to Glasgow daily, so we know the best routes and how to handle
                parking restrictions and busy loading bays. Our service is ideal for city flats, student moves, and
                same-day deliveries from retail stores or private sellers.
              </p>
              <p>
                With transparent pricing and a friendly approach, we make it easy to book your move. You can choose
                a time slot that fits your schedule and add packing support or furniture assembly if needed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "House removals and flat moves",
                  "Furniture collection from retailers",
                  "Office relocations with minimal downtime",
                  "Same-day courier and urgent deliveries",
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
                src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&h=700&fit=crop&q=80"
                alt="Delivery team serving Glasgow"
                className="w-full h-44 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Glasgow Coverage</h3>
              </div>
              <p className="text-sm text-muted-foreground font-light">
                Regular routes across the West End, City Centre, Southside, and surrounding areas.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link href="/quote">Get a Glasgow Quote</Link>
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                Same-day availability subject to schedule.
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
