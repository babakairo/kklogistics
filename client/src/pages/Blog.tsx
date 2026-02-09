import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CalendarDays } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Kaithan Logistics Blog",
  url: "https://kaithanlogistics.co.uk/blog",
  description: "Moving tips, relocation checklists, and logistics advice from Kaithan Logistics.",
};

const posts = [
  {
    title: "How to Prepare for a Stress-Free House Move in Scotland",
    description:
      "A practical, step-by-step guide to planning, packing, and moving day coordination for Scottish homes.",
    href: "/blog/stress-free-house-move-scotland",
    date: "9 Feb 2026",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=900&h=700&fit=crop&q=80",
  },
  {
    title: "A Checklist for Your Upcoming Office Relocation",
    description:
      "Everything a business needs to prepare for a smooth office move, from IT planning to staff communication.",
    href: "/blog/office-relocation-checklist",
    date: "9 Feb 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop&q=80",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Blog & Moving Guides | Kaithan Logistics"
        description="Helpful moving guides, checklists, and advice for house removals, office relocations, and delivery services across Scotland."
        canonicalPath="/blog"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative">
            <div className="max-w-3xl">
              <p className="subtitle mb-4">Articles & Guides</p>
              <h1 className="mb-6">Moving Tips from the Kaithan Logistics Team</h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Practical advice for home moves, office relocations, and deliveries across Central Scotland.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.href} className="border-border/50">
                <CardContent className="p-6 space-y-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    {post.date}
                  </div>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-muted-foreground font-light">{post.description}</p>
                  <Link
                    href={post.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
