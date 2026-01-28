import { Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function StickyMobileButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky buttons after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show on mobile (< md breakpoint = 768px)
  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transform transition-all duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } md:hidden`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-border shadow-2xl">
        <div className="container max-w-full px-4">
          <div className="flex gap-3 py-3">
            {/* Call Button */}
            <a
              href="tel:07459920895"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/447459920895?text=Hi%20KK%20Logistics,%20I'd%20like%20a%20quote%20for..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
