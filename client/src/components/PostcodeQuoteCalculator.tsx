import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, MapPin, Check, AlertCircle } from "lucide-react";

interface PostcodeQuoteProps {
  onQuoteResult?: (data: any) => void;
}

export function PostcodeQuoteCalculator({ onQuoteResult }: PostcodeQuoteProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const calculateQuote = trpc.postcode.quote.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setError("");
      onQuoteResult?.(data);
      toast.success("Quote calculated successfully!");
    },
    onError: (err: any) => {
      setError(err.message || "Failed to calculate quote");
      setResult(null);
      toast.error(err.message || "Failed to calculate quote");
    },
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) {
      toast.error("Please enter both postcodes");
      return;
    }
    calculateQuote.mutate({
      origin: origin.trim(),
      destination: destination.trim(),
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Calculate Quote by Postcode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origin">Pickup Postcode</Label>
                <Input
                  id="origin"
                  placeholder="e.g., FK2 9NR"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                  disabled={calculateQuote.isPending}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="destination">Delivery Postcode</Label>
                <Input
                  id="destination"
                  placeholder="e.g., EH8 8DX"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value.toUpperCase())}
                  disabled={calculateQuote.isPending}
                  className="mt-2"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={calculateQuote.isPending || !origin.trim() || !destination.trim()}
              className="w-full"
            >
              {calculateQuote.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Get Quote"
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-gradient-to-br from-pastel-blue/20 to-pastel-pink/20 p-6 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5 text-green-600" />
                  <p className="font-semibold text-sm text-muted-foreground">Quote Calculated</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Distance</p>
                    <p className="text-lg font-bold">{result.distance_miles} miles</p>
                  </div>
                  {result.duration_minutes && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Est. Duration</p>
                      <p className="text-lg font-bold">{Math.round(result.duration_minutes)} mins</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Price Breakdown</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base fee:</span>
                      <span>£{result.quote.breakdown.base_fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance ({result.distance_miles} mi × £{result.quote.breakdown.per_mile}/mi):</span>
                      <span>£{(result.quote.breakdown.per_mile * result.distance_miles).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-xs">
                      <span>Subtotal:</span>
                      <span>£{result.quote.breakdown.subtotal.toFixed(2)}</span>
                    </div>
                    {result.quote.breakdown.subtotal < result.quote.breakdown.minimum_charge && (
                      <div className="flex justify-between text-xs text-amber-600">
                        <span>Min charge applied:</span>
                        <span>£{result.quote.breakdown.minimum_charge.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border/50 mt-4 pt-4 flex items-center justify-between">
                    <span className="font-semibold">Estimated Quote</span>
                    <span className="text-2xl font-bold text-primary">
                      £{result.quote.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This is an estimate. Final quote may vary based on items and special requirements.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
