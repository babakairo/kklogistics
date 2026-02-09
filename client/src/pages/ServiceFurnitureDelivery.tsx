import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ShieldCheck, Truck } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Furniture Delivery",
  serviceType: "Furniture Delivery",
  url: "https://kaithanlogistics.co.uk/services/furniture-delivery",
  description:
    "Safe collection and delivery of furniture across Falkirk and Central Scotland, including retailer pickups and private sales.",
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

export default function ServiceFurnitureDelivery() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Furniture Delivery & Collection | Kaithan Logistics"
        description="Reliable furniture delivery for retailers, marketplace purchases, and private sales across Central Scotland. Careful handling and flexible time slots."
        canonicalPath="/services/furniture-delivery"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">Furniture Delivery</p>
              <h1 className="mb-6">Safe Collection & Delivery for Every Item</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Bought a sofa online or need to move a wardrobe between homes? We collect, protect, and deliver your
                furniture with care across Falkirk and Central Scotland.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Furniture deliveries are all about timing and protection. Our team handles collections from large
                retailers, independent stores, and private sellers. We arrive when promised, load carefully, and use
                blankets and straps to keep items safe in transit. If you need help carrying items up stairs or into
                tight doorways, we’re happy to assist.
              </p>
              <p>
                We offer flexible booking windows with same-day or next-day options when available. This is ideal for
                marketplace purchases where timing is critical. Our pricing is transparent and based on distance,
                item size, and access requirements, so you always know what you’re paying for before we arrive.
              </p>
              <p>
                From single chairs to full room sets, we treat every item with care. We can also provide basic
                disassembly and reassembly to make transport easier, and we’ll place items where you want them when
                we arrive.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Retailer and private seller collections",
                  "Protective wrapping included",
                  "Stair and apartment access support",
                  "Flexible time slots and weekend delivery",
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
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=700&fit=crop"
                alt="Delivery professional loading boxes into a van"
                className="w-full h-44 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Delivery Benefits</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary mt-1" />
                  Fully insured handling for peace of mind.
                </li>
                <li className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-primary mt-1" />
                  Large van suitable for bulky items.
                </li>
              </ul>
              <Button asChild size="lg" className="w-full">
                <Link href="/quote">Request a Delivery Quote</Link>
              </Button>
              <p className="text-xs text-muted-foreground font-light">
                Need a collection today? Call 07459 920 895 to check availability.
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
