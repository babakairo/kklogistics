import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { CalendarDays, ArrowLeft } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Prepare for a Stress-Free House Move in Scotland",
  description:
    "A practical guide to planning, packing, and coordinating your house move in Scotland for a calm moving day.",
  author: {
    "@type": "Organization",
    name: "Kaithan Logistics",
  },
  publisher: {
    "@type": "Organization",
    name: "Kaithan Logistics",
    url: "https://kaithanlogistics.co.uk",
  },
  datePublished: "2026-02-09",
  dateModified: "2026-02-09",
  mainEntityOfPage: "https://kaithanlogistics.co.uk/blog/stress-free-house-move-scotland",
};

export default function BlogPostStressFreeMove() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="How to Prepare for a Stress-Free House Move in Scotland"
        description="Plan a smooth Scottish house move with a clear timeline, smart packing tips, and moving-day guidance from Kaithan Logistics."
        canonicalPath="/blog/stress-free-house-move-scotland"
        ogType="article"
        schema={schema}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full shape-pastel-blue blur-3xl opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full shape-pastel-pink blur-3xl opacity-50" />

          <div className="container relative max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
            <p className="subtitle mb-4">House Moving Guide</p>
            <h1 className="mb-4">How to Prepare for a Stress-Free House Move in Scotland</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              9 Feb 2026
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container max-w-3xl space-y-6 text-muted-foreground font-light leading-relaxed">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop"
              alt="Moving boxes packed and ready"
              className="w-full h-64 object-cover rounded-xl"
              loading="lazy"
            />
            <p>
              A smooth house move starts with a simple plan. In Scotland, tight stairwells, city centre access
              restrictions, and unpredictable weather can add complexity, so preparation makes all the difference.
              Whether you’re moving from a flat in Glasgow or a family home in Falkirk, a calm timeline keeps you in
              control and reduces last-minute stress.
            </p>
            <p>
              Begin your planning four to six weeks ahead. Create a checklist for utilities, change of address, and
              any parking or building access you may need. If you live in a busy area, consider reserving a parking
              space or checking loading bay rules with your building manager. This saves precious time on moving day
              and helps your removals team work efficiently.
            </p>
            <p>
              Packing is easier when you start early and work room by room. Label boxes on the top and two sides so
              they’re easy to identify. Keep a “first-night” box with essentials like kettle, chargers, bedding, and
              toiletries. For fragile items, use bubble wrap or blankets, and fill any gaps to prevent movement during
              transit.
            </p>
            <p>
              A detailed inventory helps your moving team estimate the right van size and schedule. Include large
              items such as wardrobes, sofas, and dining tables, along with any awkward items that need extra care.
              If you’re unsure, send photos — it’s often the quickest way to get accurate guidance.
            </p>
            <p>
              On moving day, keep valuables and important documents with you rather than in the van. A clear path to
              the door, dismantled furniture, and labelled boxes will speed things up. If children or pets are at
              home, arrange a quiet room or a family member to look after them while the move is underway.
            </p>
            <p>
              Finally, choose a removals company that’s fully insured, transparent, and responsive. A short call to
              confirm timing, access points, and any special items will ensure the day runs smoothly. With a bit of
              planning and the right support, your move can be efficient, safe, and far less stressful than expected.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
