import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import type { Pool } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Info, ChevronRight, ChevronLeft, TrendingUp, ArrowRight, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { walletBalances } from "@/lib/mock-data";

const depositSchema = z.object({
  token: z.string().min(1, "Please select a token"),
  amount: z.string()
    .min(1, "Amount is required")
    .refine(val => !isNaN(Number(val)), "Must be a valid number")
    .refine(val => Number(val) > 0, "Amount must be greater than 0"),
});

type DepositFormData = z.infer<typeof depositSchema>;

interface DepositDialogProps {
  pool: Pool;
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = ["enter_details", "review"] as const;

export function DepositDialog({ pool, isOpen, onClose }: DepositDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      token: "",
      amount: "",
    },
  });

  const selectedToken = form.watch("token");
  const amount = Number(form.watch("amount")) || 0;

  // Get token balance and price
  const getTokenBalance = (token: string) => {
    if (token === "SOL") return walletBalances.sol;
    if (token === "USDC") return walletBalances.usdc;
    return 0;
  };

  const getTokenPrice = (token: string) => {
    if (token === "SOL") return walletBalances.solPrice;
    if (token === "USDC") return walletBalances.usdcPrice;
    return 0;
  };

  const tokenBalance = getTokenBalance(selectedToken);
  const tokenPrice = getTokenPrice(selectedToken);
  const usdValue = amount * tokenPrice;

  // Calculate yields
  const estimatedDailyYield = (Number(pool.fees24h) * (usdValue / Number(pool.tvl)));
  const estimatedYearlyYield = estimatedDailyYield * 365;
  const estimatedAPR = (estimatedYearlyYield / usdValue) * 100;

  async function onSubmit(data: DepositFormData) {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Success!",
        description: `Successfully deposited ${data.amount} ${data.token} (${formatCurrency(usdValue)}) into ${pool.name} pool`,
      });
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process deposit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[460px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Deposit into {pool.name}
                <Badge variant="outline" className="font-normal text-xs">
                  {pool.token1} + {pool.token2}
                </Badge>
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                <span>Step {currentStep + 1} of {STEPS.length}: {
                  currentStep === 0 ? "Enter Amount" : "Review & Confirm"
                }</span>
                <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-1" />
              </DialogDescription>
            </DialogHeader>

            {currentStep === 0 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Token to Deposit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a token" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={pool.token1}>
                            <div className="flex items-center justify-between w-full">
                              <span>{pool.token1}</span>
                              <span className="text-muted-foreground">
                                Balance: {getTokenBalance(pool.token1).toLocaleString()}
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value={pool.token2}>
                            <div className="flex items-center justify-between w-full">
                              <span>{pool.token2}</span>
                              <span className="text-muted-foreground">
                                Balance: {getTokenBalance(pool.token2).toLocaleString()}
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedToken && (
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount to Deposit</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="relative">
                              <Input
                                placeholder="0.00"
                                type="number"
                                step="any"
                                className="pl-12 pr-28 text-lg"
                                {...field}
                              />
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">
                                {selectedToken}
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 text-xs"
                                onClick={() => form.setValue("amount", tokenBalance.toString())}
                              >
                                MAX
                              </Button>
                            </div>

                            {amount > 0 && (
                              <div className="text-sm text-muted-foreground text-right">
                                ≈ {formatCurrency(usdValue)}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {amount > 0 && (
                  <Card className="bg-muted/50 border-none">
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Expected Daily Yield</span>
                        <span className="font-medium text-green-500">
                          +{formatCurrency(estimatedDailyYield)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Expected Yearly Yield</span>
                        <span className="font-medium text-green-500">
                          +{formatCurrency(estimatedYearlyYield)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">APR</span>
                        <span className="font-medium text-green-500">{estimatedAPR.toFixed(2)}%</span>
                      </div>
                    </div>
                  </Card>
                )}

                <Alert variant="outline" className="bg-muted/50">
                  <AlertDescription className="text-sm flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      When you deposit {selectedToken || "tokens"} into this pool, you'll earn fees from trades 
                      and receive yield on your deposit. The APR shown is based on current trading volume.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <Card className="bg-muted/50 border-none">
                  <div className="p-4 space-y-4">
                    <h3 className="font-medium">Deposit Summary</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">You're Depositing</span>
                        <div className="text-right">
                          <div className="font-medium">{amount} {selectedToken}</div>
                          <div className="text-sm text-muted-foreground">≈ {formatCurrency(usdValue)}</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Pool</span>
                        <span className="font-medium">{pool.name}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Expected APR</span>
                        <span className="font-medium text-green-500">{pool.apr}%</span>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Daily Yield</span>
                          <span className="font-medium text-green-500">+{formatCurrency(estimatedDailyYield)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-muted-foreground">Yearly Yield</span>
                          <span className="font-medium text-green-500">+{formatCurrency(estimatedYearlyYield)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Alert>
                  <AlertDescription className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      Please review your deposit details. Once confirmed, you'll start earning yields 
                      immediately. You can withdraw your deposit at any time.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <DialogFooter className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}

              <Button
                type="button"
                onClick={() => {
                  if (currentStep < STEPS.length - 1) {
                    if (!selectedToken || !amount) {
                      form.trigger();
                      return;
                    }
                    setCurrentStep(prev => prev + 1);
                  } else {
                    form.handleSubmit(onSubmit)();
                  }
                }}
                disabled={isSubmitting || (currentStep === 0 && !form.formState.isValid)}
                className="flex-1"
              >
                {currentStep === STEPS.length - 1 ? (
                  isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      Confirm Deposit
                      <TrendingUp className="h-4 w-4 ml-2" />
                    </>
                  )
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}