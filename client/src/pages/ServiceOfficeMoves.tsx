import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building2, ShieldCheck, Timer } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Office Moves",
  serviceType: "Office Relocation",
  url: "https://kaithanlogistics.co.uk/services/office-moves",
  description:
    "Planned office moves with minimal downtime. We relocate workstations, IT equipment, and files across Central Scotland.",
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

export default function ServiceOfficeMoves() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Office Moves & Business Relocation | Kaithan Logistics"
        description="Efficient office moves with careful handling of IT equipment, desks, and files. Weekend and out-of-hours slots available across Central Scotland."
        canonicalPath="/services/office-moves"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">Office Moves</p>
              <h1 className="mb-6">Business Relocation Without the Downtime</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                We help businesses relocate smoothly with structured planning, careful handling of equipment, and
                flexible schedules that keep your team productive.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Office relocations demand precision. We begin with a walkthrough or call to map your layout, access
                points, and timelines. Whether you’re moving a small studio or a multi-floor workspace, we plan the
                sequence to minimise disruption and keep key departments running.
              </p>
              <p>
                Our team labels and loads carefully, with special attention for IT equipment, screens, and sensitive
                files. We can move desks and storage units as-is or dismantle and reassemble when needed. If your new
                space has restricted access or lift times, we’ll coordinate to stay within the building’s rules.
              </p>
              <p>
                We offer evening and weekend slots so you can relocate outside of peak hours. With transparent
                pricing and a clear timeline, you’ll know exactly what to expect on move day.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "IT-safe handling and cable care",
                  "Clear labelling and room placement",
                  "Weekend and out-of-hours options",
                  "Support for multi-floor moves",
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
                alt="Team beside a delivery van ready for an office move"
                className="w-full h-44 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Office Move Support</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary mt-1" />
                  Fully insured for equipment and inventory.
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="w-4 h-4 text-primary mt-1" />
                  Dedicated scheduling to reduce downtime.
                </li>
              </ul>
              <Button asChild size="lg" className="w-full">
                <Link href="/quote">Request a Business Quote</Link>
              </Button>
              <p className="text-xs text-muted-foreground font-light">
                Speak to us about phased moves and after-hours options.
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
