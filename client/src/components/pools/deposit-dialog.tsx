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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
      <DialogContent className="sm:max-w-[440px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader className="space-y-3">
              <DialogTitle className="flex items-center gap-2 text-xl">
                Deposit into {pool.name}
                <Badge variant="outline" className="font-normal text-xs">
                  {pool.token1} + {pool.token2}
                </Badge>
              </DialogTitle>
              <DialogDescription className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Step {currentStep + 1} of {STEPS.length}:</span>
                  <span>{currentStep === 0 ? "Enter Amount" : "Review & Confirm"}</span>
                </div>
                <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-1" />
              </DialogDescription>
            </DialogHeader>

            {currentStep === 0 && (
              <div className="space-y-6">
                <Card className="border-none bg-muted/50">
                  <CardContent className="space-y-4 p-4">
                    <FormField
                      control={form.control}
                      name="token"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Select Token</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Choose a token" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={pool.token1}>
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-medium">{pool.token1}</span>
                                  <span className="text-sm text-muted-foreground">
                                    Balance: {getTokenBalance(pool.token1).toLocaleString()}
                                  </span>
                                </div>
                              </SelectItem>
                              <SelectItem value={pool.token2}>
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-medium">{pool.token2}</span>
                                  <span className="text-sm text-muted-foreground">
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
                            <FormLabel className="text-sm font-medium">Amount to Deposit</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <div className="relative">
                                  <Input
                                    placeholder="0.00"
                                    type="number"
                                    step="any"
                                    className="pl-14 pr-24 h-12 text-lg"
                                    {...field}
                                  />
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-medium">
                                    {selectedToken}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 font-medium"
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
                  </CardContent>
                </Card>

                {amount > 0 && (
                  <Card className="border-none bg-muted/50">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Expected Returns
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Daily Yield</span>
                          <span className="font-medium text-green-500">
                            +{formatCurrency(estimatedDailyYield)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Yearly Yield</span>
                          <span className="font-medium text-green-500">
                            +{formatCurrency(estimatedYearlyYield)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t">
                          <span className="text-sm text-muted-foreground">APR</span>
                          <span className="font-medium text-green-500">
                            {estimatedAPR.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Alert variant="outline" className="bg-muted/50">
                  <AlertDescription className="text-sm flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      When you deposit {selectedToken || "tokens"} into this pool, you'll earn fees from trades 
                      and receive yield on your deposit. You can withdraw anytime.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <Card className="border-none bg-muted/50">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Deposit Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">You're Depositing</span>
                        <div className="text-right">
                          <div className="font-medium">{amount} {selectedToken}</div>
                          <div className="text-xs text-muted-foreground">≈ {formatCurrency(usdValue)}</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Pool</span>
                        <span className="font-medium">{pool.name}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Expected APR</span>
                        <span className="font-medium text-green-500">{pool.apr}%</span>
                      </div>

                      <div className="pt-3 mt-2 border-t space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Daily Yield</span>
                          <span className="font-medium text-green-500">+{formatCurrency(estimatedDailyYield)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Yearly Yield</span>
                          <span className="font-medium text-green-500">+{formatCurrency(estimatedYearlyYield)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <AlertDescription className="text-sm flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      Please review your deposit details carefully. Once confirmed, you'll start earning yields 
                      immediately.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <DialogFooter className="flex gap-2 pt-2">
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