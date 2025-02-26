import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import type { Pool } from "@shared/schema";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import { Info, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const depositSchema = z.object({
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

const STEPS = ["Amount", "Token Split", "Confirmation"] as const;

export function DepositDialog({ pool, isOpen, onClose }: DepositDialogProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
    },
  });

  const amount = Number(form.watch("amount")) || 0;
  const token0Amount = amount / Number(pool.token0Price);
  const token1Amount = amount / Number(pool.token1Price);
  const estimatedDailyYield = (Number(pool.dailyFees) * (amount / Number(pool.tvl)));
  const estimatedYearlyYield = estimatedDailyYield * 365;
  const estimatedAPR = (estimatedYearlyYield / amount) * 100;

  async function onSubmit(data: DepositFormData) {
    setIsSubmitting(true);
    try {
      // Simulate deposit transaction
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Success!",
        description: `Deposited ${formatCurrency(Number(data.amount))} into ${pool.name} pool`,
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

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (USDC)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      {...field}
                    />
                    {amount > 0 && (
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Pool Share:</span>
                          <span>{((amount / Number(pool.tvl)) * 100).toFixed(4)}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Daily Yield (est.):</span>
                          <span className="text-green-500">+{formatCurrency(estimatedDailyYield)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Token Split Preview</h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{pool.token0}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Current price: {formatCurrency(Number(pool.token0Price))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="font-medium">{token0Amount.toFixed(6)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{pool.token1}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Current price: {formatCurrency(Number(pool.token1Price))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="font-medium">{token1Amount.toFixed(6)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Expected Returns</h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Estimated APR</span>
                  <span className="font-medium text-green-500">{estimatedAPR.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Daily Yield</span>
                  <span className="font-medium text-green-500">+{formatCurrency(estimatedDailyYield)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Yearly Yield</span>
                  <span className="font-medium text-green-500">+{formatCurrency(estimatedYearlyYield)}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Deposit Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Value:</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{pool.token0}:</span>
                  <span>{token0Amount.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{pool.token1}:</span>
                  <span>{token1Amount.toFixed(6)}</span>
                </div>
                <div className="flex justify-between text-green-500">
                  <span>Expected Daily Yield:</span>
                  <span>+{formatCurrency(estimatedDailyYield)}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-500">
                Please review the details carefully. Once confirmed, this action cannot be undone.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Deposit into {pool.name}</DialogTitle>
              <DialogDescription>
                Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
              </DialogDescription>
              <Progress
                value={((currentStep + 1) / STEPS.length) * 100}
                className="h-1"
              />
            </DialogHeader>

            {renderStepContent()}

            <DialogFooter className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={previousStep}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              {currentStep === 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting || (currentStep === 0 && !form.formState.isValid)}
                className="flex-1"
              >
                {currentStep === STEPS.length - 1 ? (
                  isSubmitting ? "Processing..." : "Confirm Deposit"
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