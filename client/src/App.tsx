import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogPostStressFreeMove from "./pages/BlogPostStressFreeMove";
import BlogPostOfficeRelocation from "./pages/BlogPostOfficeRelocation";
import ServiceHouseRemovals from "./pages/ServiceHouseRemovals";
import ServiceFurnitureDelivery from "./pages/ServiceFurnitureDelivery";
import ServiceOfficeMoves from "./pages/ServiceOfficeMoves";
import ServiceCourierServices from "./pages/ServiceCourierServices";
import ServiceAreaGlasgow from "./pages/ServiceAreaGlasgow";
import ServiceAreaEdinburgh from "./pages/ServiceAreaEdinburgh";
import DriverRegister from "./pages/DriverRegister";
import DriverApplicationSubmitted from "./pages/DriverApplicationSubmitted";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/house-removals" component={ServiceHouseRemovals} />
      <Route path="/services/furniture-delivery" component={ServiceFurnitureDelivery} />
      <Route path="/services/office-moves" component={ServiceOfficeMoves} />
      <Route path="/services/courier-services" component={ServiceCourierServices} />
      <Route path="/service-area/man-with-a-van-glasgow" component={ServiceAreaGlasgow} />
      <Route path="/service-area/man-with-a-van-edinburgh" component={ServiceAreaEdinburgh} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/stress-free-house-move-scotland" component={BlogPostStressFreeMove} />
      <Route path="/blog/office-relocation-checklist" component={BlogPostOfficeRelocation} />
      <Route path="/contact" component={Contact} />
      <Route path="/quote" component={Quote} />
      {/* Driver routes */}
      <Route path="/driver/register" component={DriverRegister} />
      <Route path="/driver/application-submitted" component={DriverApplicationSubmitted} />
      <Route path="/driver/dashboard" component={DriverDashboard} />
      {/* Admin routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
