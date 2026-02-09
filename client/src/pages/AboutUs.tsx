import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Shield, Users, Award } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kaithan Logistics",
  url: "https://kaithanlogistics.co.uk",
  telephone: "+44-7459-920-895",
  email: "info@kaithanlogistics.co.uk",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Falkirk",
    addressRegion: "Scotland",
    addressCountry: "GB",
  },
};

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="About Us | Kaithan Logistics"
        description="Learn about Kaithan Logistics — a Falkirk-based, fully insured removals and delivery team serving Central Scotland with care and reliability."
        canonicalPath="/about-us"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">About Us</p>
              <h1 className="mb-6">A Local Team Built on Trust</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Kaithan Logistics was founded to bring reliable, friendly moving services to Falkirk and Central
                Scotland. We believe every move should feel organised, clear, and supported.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                What started as a local van service has grown into a trusted removals and courier team serving
                households and businesses across the region. We’re proud of our 5-star reputation and our commitment
                to treating every item as if it were our own.
              </p>
              <p>
                Our owner-led team takes time to understand each customer’s needs. We offer honest advice, flexible
                scheduling, and transparent pricing — no hidden fees, no surprises. Whether you’re moving home,
                relocating your business, or collecting furniture, we aim to make the experience simple and
                stress-free.
              </p>
              <p>
                We’re fully insured, punctual, and local. From Falkirk to Glasgow and Edinburgh, our drivers know the
                roads and plan routes to keep your move efficient. We show up prepared, communicate clearly, and make
                sure you feel supported from first call to final delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: HeartHandshake,
                  title: "Customer First",
                  text: "Friendly service and clear communication at every stage.",
                },
                {
                  icon: Shield,
                  title: "Fully Insured",
                  text: "Comprehensive coverage for goods in transit.",
                },
                {
                  icon: Users,
                  title: "Local Expertise",
                  text: "Falkirk-based team serving Central Scotland daily.",
                },
                {
                  icon: Award,
                  title: "5-Star Rated",
                  text: "Trusted by homeowners, students, and businesses.",
                },
              ].map((item) => (
                <Card key={item.title} className="border-border/50">
                  <CardContent className="p-6 space-y-3">
                    <item.icon className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
