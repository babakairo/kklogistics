import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, Phone, X } from "lucide-react";

const serviceLinks = [
  { href: "/services/house-removals", label: "House Removals" },
  { href: "/services/furniture-delivery", label: "Furniture Delivery" },
  { href: "/services/office-moves", label: "Office Moves" },
  { href: "/services/courier-services", label: "Courier Services" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/quote", label: "Get Quote" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">KK</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg tracking-tight">KK Logistics</span>
              <p className="text-xs text-muted-foreground font-light tracking-wider">MAN WITH A VAN</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={`text-sm font-medium transition-smooth hover:text-primary ${
                        location === "/" ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground">Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-56 gap-1 p-2">
                      <NavigationMenuLink asChild>
                        <Link href="/services" className={navigationMenuTriggerStyle()}>
                          All Services
                        </Link>
                      </NavigationMenuLink>
                      {serviceLinks.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link href={link.href} className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {navLinks
                  .filter((link) => link.href !== "/")
                  .map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={`text-sm font-medium transition-smooth hover:text-primary px-3 py-2 rounded-md ${
                            location === link.href ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA & Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:07459920895"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
            >
              <Phone className="w-4 h-4" />
              <span>07459 920 895</span>
            </a>
            <Button asChild>
              <Link href="/quote">Get Free Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <div className="flex flex-col h-full pt-8">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium py-2 transition-smooth ${
                      location === "/" ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Home
                  </Link>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Services</p>
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium py-2 transition-smooth ${
                        location === "/services" ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      All Services
                    </Link>
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-base font-medium py-1 transition-smooth ${
                          location === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  {navLinks
                    .filter((link) => link.href !== "/")
                    .map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium py-2 transition-smooth ${
                          location === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                </nav>
                
                <div className="mt-auto pb-8 space-y-4">
                  <a
                    href="tel:07459920895"
                    className="flex items-center gap-3 text-lg font-medium"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Call us</p>
                      <p>07459 920 895</p>
                    </div>
                  </a>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                      Get Free Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
