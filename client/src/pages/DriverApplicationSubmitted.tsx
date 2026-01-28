import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Phone, Mail } from "lucide-react";

export default function DriverApplicationSubmitted() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 md:py-20">
        <div className="container max-w-lg text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Application Submitted!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for applying to become a driver partner with KK Logistics. 
            We've received your application and will review it shortly.
          </p>

          {/* What's Next */}
          <div className="bg-secondary/50 rounded-xl p-6 text-left mb-8">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-pastel-blue" />
              What Happens Next?
            </h2>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">1</span>
                <span>Our team will review your application within 1-2 business days</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary text-foreground flex items-center justify-center text-xs flex-shrink-0">2</span>
                <span>We may contact you to verify details or request additional documents</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary text-foreground flex items-center justify-center text-xs flex-shrink-0">3</span>
                <span>Once approved, you'll receive access to the driver dashboard</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary text-foreground flex items-center justify-center text-xs flex-shrink-0">4</span>
                <span>Start accepting jobs and earning with KK Logistics!</span>
              </li>
            </ol>
          </div>

          {/* Contact Info */}
          <div className="bg-pastel-blue/10 rounded-xl p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-3">
              Questions about your application?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:07459920895" 
                className="flex items-center justify-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                07459 920 895
              </a>
              <a 
                href="mailto:drivers@kklogistics.co.uk" 
                className="flex items-center justify-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <Link href="/">
            <Button variant="outline" size="lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
