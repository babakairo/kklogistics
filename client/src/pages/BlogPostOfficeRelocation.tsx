import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Seo from "@/components/Seo";
import { CalendarDays, ArrowLeft } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "A Checklist for Your Upcoming Office Relocation",
  description:
    "A practical checklist for planning a smooth office move, covering IT planning, timelines, and staff communication.",
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
  mainEntityOfPage: "https://kaithanlogistics.co.uk/blog/office-relocation-checklist",
};

export default function BlogPostOfficeRelocation() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="A Checklist for Your Upcoming Office Relocation"
        description="Follow this office relocation checklist to reduce downtime, coordinate teams, and move equipment safely across Scotland."
        canonicalPath="/blog/office-relocation-checklist"
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
            <p className="subtitle mb-4">Business Relocation</p>
            <h1 className="mb-4">A Checklist for Your Upcoming Office Relocation</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              9 Feb 2026
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container max-w-3xl space-y-6 text-muted-foreground font-light leading-relaxed">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80"
              alt="Moving truck ready for an office relocation"
              className="w-full h-64 object-cover rounded-xl"
              loading="lazy"
            />
            <p>
              Office moves are a balancing act between maintaining business operations and transporting equipment
              safely. A clear checklist helps you avoid costly downtime and ensures teams know what to expect. The
              key is to plan early, assign responsibilities, and communicate clearly with staff and suppliers.
            </p>
            <p>
              Start by setting a relocation timeline that includes key milestones: contract signing, IT planning,
              packing, and final handover. Assign a move coordinator or small team to manage vendors and internal
              updates. If you’re moving between floors or locations, map out which departments will move first and
              how you’ll maintain service levels during the transition.
            </p>
            <p>
              IT planning is critical. Work with your provider to schedule network setup, internet activation, and
              any security requirements. Back up all important data, label cables, and document current workstation
              setups to make reassembly faster. For sensitive equipment, use protective cases and ensure it travels
              with the appropriate team member.
            </p>
            <p>
              Communication keeps employees aligned. Share a clear moving-day schedule, access instructions, and
              what each team member needs to pack or label. Encourage staff to clear desks and mark personal items.
              A simple floor plan of the new office helps everyone understand where they’ll be located.
            </p>
            <p>
              Finally, confirm logistics with your removals team. Provide access details, loading bay rules, lift
              times, and any items that need special handling. Once the move is complete, run a quick audit to ensure
              everything arrived and is functioning. With a structured plan and a trusted removals partner, your
              office relocation can be smooth, efficient, and on schedule.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
