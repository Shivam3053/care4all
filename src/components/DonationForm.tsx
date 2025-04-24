
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

interface DonationFormProps {
  ngoName: string;
  upiId: string;
}

const donationOptions = [
  { value: "500", label: "₹500" },
  { value: "1000", label: "₹1,000" },
  { value: "2000", label: "₹2,000" },
  { value: "5000", label: "₹5,000" },
  { value: "custom", label: "Custom Amount" },
];

const DonationForm = ({ ngoName, upiId }: DonationFormProps) => {
  const [amount, setAmount] = useState(donationOptions[1].value);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleDonate = () => {
    const donationAmount = amount === "custom" ? customAmount : amount;

    if (!donationAmount || Number(donationAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      toast({
        title: "Donation successful!",
        description: `Your ${isRecurring ? "monthly " : ""}donation of ₹${donationAmount} to ${ngoName} has been processed. Thank you for your support!`,
      });

      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Donate to {ngoName}</CardTitle>
        <CardDescription>
          Your contribution helps support their important work.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Select Amount</Label>
          <RadioGroup 
            value={amount} 
            onValueChange={setAmount}
            className="flex flex-wrap gap-2"
          >
            {donationOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={`amount-${option.value}`}
                  className="sr-only"
                />
                <Label
                  htmlFor={`amount-${option.value}`}
                  className={`flex h-10 cursor-pointer items-center rounded-md border border-input px-4 py-2 text-sm transition-colors ${
                    amount === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background hover:bg-secondary"
                  }`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {amount === "custom" && (
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Custom Amount</Label>
            <div className="flex items-center">
              <span className="mr-2 text-lg">₹</span>
              <Input
                id="custom-amount"
                placeholder="Enter amount"
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="recurring" className="flex-1">
            Make this a monthly donation
          </Label>
          <Switch
            id="recurring"
            checked={isRecurring}
            onCheckedChange={setIsRecurring}
          />
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="rounded-md border border-input p-4">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-green-500"></div>
              <div>
                <div className="font-medium">UPI Payment</div>
                <div className="text-sm text-muted-foreground">
                  UPI ID: {upiId}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleDonate}
          disabled={isProcessing || isSuccess}
        >
          {isProcessing ? "Processing..." : isSuccess ? (
            <span className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Donation Successful
            </span>
          ) : `Donate ${
            amount === "custom"
              ? customAmount
                ? `₹${customAmount}`
                : "Now"
              : `₹${amount}`
          }`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationForm;
