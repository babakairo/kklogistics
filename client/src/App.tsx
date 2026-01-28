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
import DriverRegister from "./pages/DriverRegister";
import DriverApplicationSubmitted from "./pages/DriverApplicationSubmitted";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
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
