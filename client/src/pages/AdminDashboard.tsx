import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Users, 
  Truck, 
  ClipboardList,
  CheckCircle2, 
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Plus,
  Eye,
  UserCheck,
  UserX,
  Send
} from "lucide-react";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("drivers");
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // New job form state
  const [newJob, setNewJob] = useState({
    jobType: "house_removal" as "house_removal" | "furniture_delivery" | "office_move" | "courier",
    title: "",
    description: "",
    pickupAddress: "",
    pickupPostcode: "",
    pickupContactName: "",
    pickupContactPhone: "",
    deliveryAddress: "",
    deliveryPostcode: "",
    deliveryContactName: "",
    deliveryContactPhone: "",
    scheduledDate: "",
    scheduledTime: "",
    customerPrice: "",
    distanceKm: "",
    notes: ""
  });

  // Assignment state
  const [assignDriverId, setAssignDriverId] = useState<string>("");
  const [driverPayout, setDriverPayout] = useState("");

  // Queries
  const { data: drivers, isLoading: driversLoading, refetch: refetchDrivers } = trpc.drivers.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin"
  });

  const { data: jobs, isLoading: jobsLoading, refetch: refetchJobs } = trpc.jobs.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin"
  });

  const { data: availableDrivers } = trpc.drivers.listAvailable.useQuery(undefined, {
    enabled: !!user && user.role === "admin" && showAssignModal
  });

  const { data: selectedDriverData } = trpc.drivers.get.useQuery(
    { id: selectedDriver! },
    { enabled: !!selectedDriver && showDriverModal }
  );

  // Mutations
  const approveDriverMutation = trpc.drivers.approve.useMutation({
    onSuccess: () => {
      toast.success("Driver approved!");
      refetchDrivers();
      setShowDriverModal(false);
    },
    onError: (error) => toast.error(error.message)
  });

  const rejectDriverMutation = trpc.drivers.reject.useMutation({
    onSuccess: () => {
      toast.success("Driver rejected");
      refetchDrivers();
      setShowDriverModal(false);
      setRejectReason("");
    },
    onError: (error) => toast.error(error.message)
  });

  const createJobMutation = trpc.jobs.create.useMutation({
    onSuccess: () => {
      toast.success("Job created!");
      refetchJobs();
      setShowCreateJobModal(false);
      setNewJob({
        jobType: "house_removal",
        title: "",
        description: "",
        pickupAddress: "",
        pickupPostcode: "",
        pickupContactName: "",
        pickupContactPhone: "",
        deliveryAddress: "",
        deliveryPostcode: "",
        deliveryContactName: "",
        deliveryContactPhone: "",
        scheduledDate: "",
        scheduledTime: "",
        customerPrice: "",
        distanceKm: "",
        notes: ""
      });
    },
    onError: (error) => toast.error(error.message)
  });

  const assignJobMutation = trpc.jobs.assign.useMutation({
    onSuccess: () => {
      toast.success("Job assigned to driver!");
      refetchJobs();
      setShowAssignModal(false);
      setSelectedJobId(null);
      setAssignDriverId("");
      setDriverPayout("");
    },
    onError: (error) => toast.error(error.message)
  });

  // Loading state
  if (authLoading) {
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

  // Not logged in or not admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              {!user ? "Please log in to access the admin dashboard." : "You don't have admin privileges."}
            </p>
            {!user && (
              <a href={getLoginUrl()}>
                <Button>Log In</Button>
              </a>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Stats
  const pendingDrivers = drivers?.filter(d => d.status === "pending") || [];
  const approvedDrivers = drivers?.filter(d => d.status === "approved") || [];
  const pendingJobs = jobs?.filter(j => j.status === "pending") || [];
  const activeJobs = jobs?.filter(j => ["assigned", "accepted", "in_progress"].includes(j.status)) || [];

  const getDriverStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getJobStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
      case "assigned":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Assigned</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Accepted</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
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
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage drivers, jobs, and leads</p>
            </div>
            <Button onClick={() => setShowCreateJobModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Job
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingDrivers.length}</p>
                    <p className="text-xs text-muted-foreground">Pending Drivers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{approvedDrivers.length}</p>
                    <p className="text-xs text-muted-foreground">Active Drivers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingJobs.length}</p>
                    <p className="text-xs text-muted-foreground">Unassigned Jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeJobs.length}</p>
                    <p className="text-xs text-muted-foreground">Active Jobs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="drivers" className="relative">
                Drivers
                {pendingDrivers.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                    {pendingDrivers.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="jobs" className="relative">
                Jobs
                {pendingJobs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {pendingJobs.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Drivers Tab */}
            <TabsContent value="drivers">
              {driversLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : !drivers || drivers.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Drivers Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Driver applications will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <Card key={driver.id}>
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                              <Truck className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{driver.fullName}</h3>
                                {getDriverStatusBadge(driver.status)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {driver.email}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {driver.phone}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {driver.vanMake} {driver.vanModel} • {driver.vanCapacity} van
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedDriver(driver.id);
                                setShowDriverModal(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {driver.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => approveDriverMutation.mutate({ id: driver.id })}
                                  disabled={approveDriverMutation.isPending}
                                >
                                  <UserCheck className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              {jobsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : !jobs || jobs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Jobs Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your first job to assign to drivers.
                    </p>
                    <Button onClick={() => setShowCreateJobModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Job
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{job.title}</h3>
                              {getJobStatusBadge(job.status)}
                              <Badge variant="secondary">{jobTypeLabels[job.jobType]}</Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-start gap-1">
                                <MapPin className="w-3 h-3 mt-0.5 text-green-600" />
                                <span className="truncate">{job.pickupAddress}</span>
                              </div>
                              <div className="flex items-start gap-1">
                                <MapPin className="w-3 h-3 mt-0.5 text-red-600" />
                                <span className="truncate">{job.deliveryAddress}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {job.scheduledDate}
                              </span>
                              <span className="font-medium text-green-600">£{job.customerPrice}</span>
                              {job.driverId && (
                                <span className="text-muted-foreground">
                                  Driver ID: {job.driverId}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {job.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedJobId(job.id);
                                  setShowAssignModal(true);
                                }}
                              >
                                <Send className="w-4 h-4 mr-1" />
                                Assign
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
          </Tabs>
        </div>
      </main>

      {/* Driver Detail Modal */}
      <Dialog open={showDriverModal} onOpenChange={setShowDriverModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
            <DialogDescription>Review driver application</DialogDescription>
          </DialogHeader>
          {selectedDriverData && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{selectedDriverData.fullName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p>{getDriverStatusBadge(selectedDriverData.status)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p>{selectedDriverData.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p>{selectedDriverData.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Address</Label>
                  <p>{selectedDriverData.address || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Postcode</Label>
                  <p>{selectedDriverData.postcode || "Not provided"}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Vehicle Details</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Van</Label>
                    <p>{selectedDriverData.vanMake} {selectedDriverData.vanModel}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Registration</Label>
                    <p>{selectedDriverData.vanRegistration}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Capacity</Label>
                    <p className="capitalize">{selectedDriverData.vanCapacity}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Year</Label>
                    <p>{selectedDriverData.vanYear || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Insurance</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Provider</Label>
                    <p>{selectedDriverData.insuranceProvider || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Goods in Transit</Label>
                    <p>{selectedDriverData.hasGoodsInTransitInsurance ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              {selectedDriverData.status === "pending" && (
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground mb-2 block">Rejection Reason (if rejecting)</Label>
                  <Textarea
                    placeholder="Enter reason for rejection..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedDriverData?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedDriver) {
                      rejectDriverMutation.mutate({ id: selectedDriver, reason: rejectReason });
                    }
                  }}
                  disabled={rejectDriverMutation.isPending}
                >
                  <UserX className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    if (selectedDriver) {
                      approveDriverMutation.mutate({ id: selectedDriver });
                    }
                  }}
                  disabled={approveDriverMutation.isPending}
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Job Modal */}
      <Dialog open={showCreateJobModal} onOpenChange={setShowCreateJobModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
            <DialogDescription>Create a job to assign to drivers</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select
                  value={newJob.jobType}
                  onValueChange={(v) => setNewJob(prev => ({ ...prev, jobType: v as typeof newJob.jobType }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house_removal">House Removal</SelectItem>
                    <SelectItem value="furniture_delivery">Furniture Delivery</SelectItem>
                    <SelectItem value="office_move">Office Move</SelectItem>
                    <SelectItem value="courier">Courier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  placeholder="e.g., 2-bed flat removal"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Job details..."
                value={newJob.description}
                onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 text-green-600">Pickup Details</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Pickup Address</Label>
                  <Input
                    placeholder="Full address"
                    value={newJob.pickupAddress}
                    onChange={(e) => setNewJob(prev => ({ ...prev, pickupAddress: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input
                    placeholder="Customer name"
                    value={newJob.pickupContactName}
                    onChange={(e) => setNewJob(prev => ({ ...prev, pickupContactName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input
                    placeholder="Phone number"
                    value={newJob.pickupContactPhone}
                    onChange={(e) => setNewJob(prev => ({ ...prev, pickupContactPhone: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 text-red-600">Delivery Details</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Delivery Address</Label>
                  <Input
                    placeholder="Full address"
                    value={newJob.deliveryAddress}
                    onChange={(e) => setNewJob(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input
                    placeholder="Recipient name"
                    value={newJob.deliveryContactName}
                    onChange={(e) => setNewJob(prev => ({ ...prev, deliveryContactName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input
                    placeholder="Phone number"
                    value={newJob.deliveryContactPhone}
                    onChange={(e) => setNewJob(prev => ({ ...prev, deliveryContactPhone: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Scheduled Date</Label>
                  <Input
                    type="date"
                    value={newJob.scheduledDate}
                    onChange={(e) => setNewJob(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={newJob.scheduledTime}
                    onChange={(e) => setNewJob(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Customer Price (£)</Label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={newJob.customerPrice}
                    onChange={(e) => setNewJob(prev => ({ ...prev, customerPrice: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateJobModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => createJobMutation.mutate(newJob)}
              disabled={createJobMutation.isPending || !newJob.title || !newJob.pickupAddress || !newJob.deliveryAddress || !newJob.scheduledDate || !newJob.customerPrice}
            >
              {createJobMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Create Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Job Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Job to Driver</DialogTitle>
            <DialogDescription>Select a driver and set their payout</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Driver</Label>
              <Select value={assignDriverId} onValueChange={setAssignDriverId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a driver..." />
                </SelectTrigger>
                <SelectContent>
                  {availableDrivers?.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id.toString()}>
                      {driver.fullName} - {driver.vanMake} ({driver.vanCapacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Driver Payout (£)</Label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={driverPayout}
                onChange={(e) => setDriverPayout(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This is the amount the driver will receive for completing this job.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedJobId && assignDriverId && driverPayout) {
                  assignJobMutation.mutate({
                    jobId: selectedJobId,
                    driverId: parseInt(assignDriverId),
                    driverPayout
                  });
                }
              }}
              disabled={assignJobMutation.isPending || !assignDriverId || !driverPayout}
            >
              {assignJobMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Assign Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
