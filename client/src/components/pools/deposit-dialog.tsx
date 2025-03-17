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
import { Info, ChevronRight, ChevronLeft, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { walletBalances } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";

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

const STEPS = ["token", "amount", "review"] as const;

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

  // Calculate USD value based on token prices
  const getUSDValue = (tokenAmount: number, token: string) => {
    if (token === "SOL") return tokenAmount * walletBalances.solPrice;
    // Add other token price calculations here
    return tokenAmount;
  };

  const usdValue = getUSDValue(amount, selectedToken);
  const estimatedDailyYield = (Number(pool.fees24h) * (usdValue / Number(pool.tvl)));
  const estimatedYearlyYield = estimatedDailyYield * 365;
  const estimatedAPR = (estimatedYearlyYield / usdValue) * 100;

  // Calculate impact on investment
  const yearlyCoffees = Math.floor(estimatedYearlyYield / 5); // assuming $5 per coffee

  async function onSubmit(data: DepositFormData) {
    setIsSubmitting(true);
    try {
      // Simulate deposit transaction
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
                  currentStep === 0 ? "Select Token" :
                  currentStep === 1 ? "Enter Amount" :
                  "Review & Confirm"
                }</span>
                <Progress
                  value={((currentStep + 1) / STEPS.length) * 100}
                  className="h-1"
                />
              </DialogDescription>
            </DialogHeader>

            {currentStep === 0 && (
              <div className="space-y-4">
                <Alert variant="outline" className="bg-muted/50">
                  <AlertDescription className="text-sm">
                    Choose which token you'd like to deposit. You can deposit either {pool.token1} or {pool.token2}.
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Token</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a token to deposit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={pool.token1}>
                            <div className="flex items-center gap-2">
                              <span>{pool.token1}</span>
                              <span className="text-muted-foreground text-sm">
                                ({formatCurrency(walletBalances.solPrice)})
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value={pool.token2}>
                            <div className="flex items-center gap-2">
                              <span>{pool.token2}</span>
                              <span className="text-muted-foreground text-sm">
                                (Price data)
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <Card className="bg-muted/50 border-none">
                  <div className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Available Balance</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{selectedToken}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedToken === "SOL" ? walletBalances.sol.toLocaleString() : "Balance"} {selectedToken}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatCurrency(selectedToken === "SOL" ? walletBalances.sol * walletBalances.solPrice : 0)}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
                          onClick={() => form.setValue("amount", selectedToken === "SOL" ? walletBalances.sol.toString() : "0")}
                        >
                          Max
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

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
                              step="0.01"
                              className="pl-12 text-lg"
                              {...field}
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">
                              {selectedToken}
                            </div>
                          </div>

                          {amount > 0 && (
                            <div className="text-sm text-muted-foreground text-right">
                              ≈ {formatCurrency(usdValue)}
                            </div>
                          )}

                          {amount > 0 && (
                            <div className="space-y-3">
                              <Card className="bg-muted/50 border-none">
                                <div className="p-4 space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                      Daily Yield
                                    </span>
                                    <span className="font-medium text-green-500">
                                      +{formatCurrency(estimatedDailyYield)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                      Yearly Yield (Est.)
                                    </span>
                                    <span className="font-medium text-green-500">
                                      +{formatCurrency(estimatedYearlyYield)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">APR</span>
                                    <span className="font-medium text-green-500">
                                      {estimatedAPR.toFixed(2)}%
                                    </span>
                                  </div>
                                </div>
                              </Card>

                              {amount >= 100 && (
                                <Alert variant="outline" className="bg-muted/50 border-primary/20">
                                  <AlertDescription className="text-sm flex items-center gap-2">
                                    <Info className="h-4 w-4 text-primary" />
                                    This investment could earn you {formatCurrency(estimatedYearlyYield)} annually - 
                                    that's enough for {yearlyCoffees} cups of coffee!
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <Card className="bg-muted/50 border-none">
                  <div className="p-4 space-y-3">
                    <h3 className="font-medium">Deposit Summary</h3>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Token</span>
                        <span className="font-medium">{selectedToken}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Amount</span>
                        <div className="text-right">
                          <div className="font-medium">{amount} {selectedToken}</div>
                          <div className="text-sm text-muted-foreground">
                            ≈ {formatCurrency(usdValue)}
                          </div>
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
                    </div>
                  </div>
                </Card>

                <Alert>
                  <AlertDescription className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      Please review your deposit details carefully. Once confirmed, 
                      this transaction cannot be undone. Make sure you understand 
                      the risks involved in providing liquidity.
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
                    if (currentStep === 0 && !selectedToken) {
                      form.setError("token", { message: "Please select a token" });
                      return;
                    }
                    setCurrentStep(prev => prev + 1);
                  } else {
                    form.handleSubmit(onSubmit)();
                  }
                }}
                disabled={isSubmitting || (currentStep === 1 && !form.formState.isValid)}
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
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
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