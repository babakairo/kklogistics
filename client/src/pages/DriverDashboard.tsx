import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Play,
  Phone,
  Navigation,
  Loader2,
  AlertCircle,
  TrendingUp,
  Star
} from "lucide-react";

export default function DriverDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("active");

  // Fetch driver profile
  const { data: driver, isLoading: driverLoading } = trpc.drivers.me.useQuery(undefined, {
    enabled: !!user
  });

  // Fetch driver's jobs
  const { data: myJobs, isLoading: jobsLoading, refetch: refetchJobs } = trpc.jobs.myJobs.useQuery(undefined, {
    enabled: !!user && !!driver
  });

  // Mutations
  const setAvailabilityMutation = trpc.drivers.setAvailability.useMutation({
    onSuccess: () => {
      toast.success("Availability updated");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const acceptJobMutation = trpc.jobs.accept.useMutation({
    onSuccess: () => {
      toast.success("Job accepted!");
      refetchJobs();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const startJobMutation = trpc.jobs.start.useMutation({
    onSuccess: () => {
      toast.success("Job started!");
      refetchJobs();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const completeJobMutation = trpc.jobs.complete.useMutation({
    onSuccess: () => {
      toast.success("Job completed!");
      refetchJobs();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  // Loading state
  if (authLoading || driverLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Login Required</h1>
            <p className="text-muted-foreground mb-6">
              Please log in to access your driver dashboard.
            </p>
            <a href={getLoginUrl()}>
              <Button>Log In</Button>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No driver profile
  if (!driver) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-md">
            <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">No Driver Profile</h1>
            <p className="text-muted-foreground mb-6">
              You don't have a driver profile yet. Apply to become a driver partner.
            </p>
            <a href="/driver/register">
              <Button>Apply Now</Button>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Driver not approved
  if (driver.status !== "approved") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-md">
            <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Application {driver.status === "pending" ? "Pending" : driver.status}</h1>
            <p className="text-muted-foreground mb-6">
              {driver.status === "pending" 
                ? "Your application is being reviewed. We'll notify you once it's approved."
                : driver.status === "rejected"
                ? `Your application was not approved. ${driver.rejectionReason || "Please contact us for more information."}`
                : "Your account is currently suspended. Please contact us for assistance."}
            </p>
            <a href="tel:07459920895">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter jobs by status
  const assignedJobs = myJobs?.filter(j => j.status === "assigned") || [];
  const activeJobs = myJobs?.filter(j => ["accepted", "in_progress"].includes(j.status)) || [];
  const completedJobs = myJobs?.filter(j => j.status === "completed") || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">New</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Accepted</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const jobTypeLabels: Record<string, string> = {
    house_removal: "House Removal",
    furniture_delivery: "Furniture Delivery",
    office_move: "Office Move",
    courier: "Courier"
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Driver Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {driver.fullName}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="availability"
                  checked={driver.isAvailable ?? true}
                  onCheckedChange={(checked) => setAvailabilityMutation.mutate({ isAvailable: checked })}
                />
                <Label htmlFor="availability" className="text-sm">
                  {driver.isAvailable ? "Available for jobs" : "Not available"}
                </Label>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{assignedJobs.length}</p>
                    <p className="text-xs text-muted-foreground">New Jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeJobs.length}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{driver.completedJobs || 0}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pastel-pink/30 flex items-center justify-center">
                    <Star className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{driver.averageRating ? Number(driver.averageRating).toFixed(1) : "N/A"}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="new" className="relative">
                New Jobs
                {assignedJobs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                    {assignedJobs.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {/* New Jobs */}
            <TabsContent value="new">
              {jobsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : assignedJobs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No New Jobs</h3>
                    <p className="text-sm text-muted-foreground">
                      New job assignments will appear here. Stay available!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {assignedJobs.map((job) => (
                    <Card key={job.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <CardDescription>{jobTypeLabels[job.jobType] || job.jobType}</CardDescription>
                          </div>
                          {getStatusBadge(job.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Pickup</p>
                              <p className="text-muted-foreground">{job.pickupAddress}</p>
                              {job.pickupContactPhone && (
                                <a href={`tel:${job.pickupContactPhone}`} className="text-primary text-xs">
                                  {job.pickupContactPhone}
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Delivery</p>
                              <p className="text-muted-foreground">{job.deliveryAddress}</p>
                              {job.deliveryContactPhone && (
                                <a href={`tel:${job.deliveryContactPhone}`} className="text-primary text-xs">
                                  {job.deliveryContactPhone}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{job.scheduledDate}</span>
                          </div>
                          {job.scheduledTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{job.scheduledTime}</span>
                            </div>
                          )}
                          {job.distanceKm && (
                            <div className="flex items-center gap-1">
                              <Navigation className="w-4 h-4 text-muted-foreground" />
                              <span>{job.distanceKm} km</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-sm text-muted-foreground">Your Payout</p>
                            <p className="text-xl font-bold text-green-600">£{job.driverPayout}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Could implement decline
                                toast.info("Contact admin to decline this job");
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => acceptJobMutation.mutate({ id: job.id })}
                              disabled={acceptJobMutation.isPending}
                            >
                              {acceptJobMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                              )}
                              Accept Job
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Active Jobs */}
            <TabsContent value="active">
              {activeJobs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Active Jobs</h3>
                    <p className="text-sm text-muted-foreground">
                      Accept new jobs to see them here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <Card key={job.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <CardDescription>{jobTypeLabels[job.jobType] || job.jobType}</CardDescription>
                          </div>
                          {getStatusBadge(job.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Pickup</p>
                              <p className="text-muted-foreground">{job.pickupAddress}</p>
                              {job.pickupContactPhone && (
                                <a href={`tel:${job.pickupContactPhone}`} className="text-primary text-xs flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3" />
                                  {job.pickupContactPhone}
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Delivery</p>
                              <p className="text-muted-foreground">{job.deliveryAddress}</p>
                              {job.deliveryContactPhone && (
                                <a href={`tel:${job.deliveryContactPhone}`} className="text-primary text-xs flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3" />
                                  {job.deliveryContactPhone}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-sm text-muted-foreground">Your Payout</p>
                            <p className="text-xl font-bold text-green-600">£{job.driverPayout}</p>
                          </div>
                          <div className="flex gap-2">
                            {job.status === "accepted" && (
                              <Button
                                onClick={() => startJobMutation.mutate({ id: job.id })}
                                disabled={startJobMutation.isPending}
                              >
                                {startJobMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                ) : (
                                  <Play className="w-4 h-4 mr-1" />
                                )}
                                Start Job
                              </Button>
                            )}
                            {job.status === "in_progress" && (
                              <Button
                                onClick={() => completeJobMutation.mutate({ id: job.id })}
                                disabled={completeJobMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {completeJobMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                )}
                                Complete Job
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Completed Jobs */}
            <TabsContent value="completed">
              {completedJobs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Completed Jobs Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Your completed jobs will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {completedJobs.map((job) => (
                    <Card key={job.id} className="opacity-80">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <CardDescription>{jobTypeLabels[job.jobType] || job.jobType}</CardDescription>
                          </div>
                          {getStatusBadge(job.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{job.scheduledDate}</span>
                            </div>
                            {job.customerRating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500" />
                                <span>{job.customerRating}/5</span>
                              </div>
                            )}
                          </div>
                          <p className="font-bold text-green-600">£{job.driverPayout}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
