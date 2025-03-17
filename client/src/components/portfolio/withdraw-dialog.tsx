import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import type { Position } from "@/lib/types";
import { pools } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Info, ChevronRight, ChevronLeft, ArrowRight, Wallet } from "lucide-react";

const withdrawSchema = z.object({
  percentage: z.number()
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage cannot exceed 100"),
});

type WithdrawFormData = z.infer<typeof withdrawSchema>;

interface WithdrawDialogProps {
  position: Position;
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = ["amount", "confirm"] as const;

export function WithdrawDialog({ position, isOpen, onClose }: WithdrawDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const pool = pools.find(p => p.id === position.poolId);

  const form = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      percentage: 100,
    },
  });

  const withdrawAmount = (position.value * form.watch("percentage")) / 100;
  const estimatedPnL = (position.pnl * form.watch("percentage")) / 100;

  async function onSubmit(data: WithdrawFormData) {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrawn ${formatCurrency(withdrawAmount)} from ${pool?.name} pool with ${estimatedPnL >= 0 ? '+' : ''}${formatCurrency(estimatedPnL)} P&L`,
      });
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process withdrawal. Please try again.",
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
                Withdraw from {pool?.name}
                <Badge variant="outline" className="font-normal text-xs">
                  {pool?.token1} + {pool?.token2}
                </Badge>
              </DialogTitle>
              <DialogDescription className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Step {currentStep + 1} of {STEPS.length}:</span>
                  <span>{currentStep === 0 ? "Select Amount" : "Review & Confirm"}</span>
                </div>
                <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-1" />
              </DialogDescription>
            </DialogHeader>

            {currentStep === 0 && (
              <div className="space-y-6">
                <Card className="border-none bg-muted/50">
                  <CardContent className="p-4 space-y-4">
                    <FormField
                      control={form.control}
                      name="percentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between items-center">
                            <span>Withdrawal Amount ({field.value}%)</span>
                            <span className="text-sm font-normal text-muted-foreground">
                              Max: {formatCurrency(position.value)}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-5">
                              <Slider
                                value={[field.value]}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={([value]) => field.onChange(value)}
                                className="pt-2"
                              />
                              <div className="p-3 rounded-lg bg-muted/70 space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">You'll Receive</span>
                                  <div className="text-right">
                                    <div className="font-medium">{formatCurrency(withdrawAmount)}</div>
                                    <div className={`text-sm ${estimatedPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                      {estimatedPnL >= 0 ? '+' : ''}{formatCurrency(estimatedPnL)} P&L
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">Remaining in Pool</span>
                                  <span className="font-medium">
                                    {formatCurrency(position.value - withdrawAmount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Alert variant="outline" className="bg-muted/50">
                  <AlertDescription className="text-sm flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      You can withdraw your funds at any time. Partial withdrawals allow you to maintain your position while accessing some of your liquidity.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <Card className="border-none bg-muted/50">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      Withdrawal Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(withdrawAmount)}</div>
                          <div className="text-sm text-muted-foreground">{form.watch("percentage")}% of position</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Realized P&L</span>
                        <span className={`font-medium ${estimatedPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {estimatedPnL >= 0 ? '+' : ''}{formatCurrency(estimatedPnL)}
                        </span>
                      </div>

                      <div className="pt-2 mt-2 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Remaining in Pool</span>
                          <span className="font-medium">{formatCurrency(position.value - withdrawAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <AlertDescription className="text-sm flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      Please review the withdrawal details carefully. This action cannot be undone once confirmed.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex gap-2 pt-2">
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
                    setCurrentStep(prev => prev + 1);
                  } else {
                    form.handleSubmit(onSubmit)();
                  }
                }}
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : currentStep === STEPS.length - 1 ? (
                  <>
                    Confirm Withdrawal
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}