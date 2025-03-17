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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import type { Pool } from "@/lib/types";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import { Info, ChevronRight, ChevronLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

const STEPS = ["amount", "review"] as const;

export function DepositDialog({ pool, isOpen, onClose }: DepositDialogProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
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
      amount: "",
    },
  });

  const amount = Number(form.watch("amount")) || 0;
  const estimatedDailyYield = (Number(pool.fees24h) * (amount / Number(pool.tvl)));
  const estimatedYearlyYield = estimatedDailyYield * 365;
  const estimatedAPR = (estimatedYearlyYield / amount) * 100;

  // Calculate impact on investment - to help users understand the real-world impact
  const yearlyCoffees = Math.floor(estimatedYearlyYield / 5); // assuming $5 per coffee

  async function onSubmit(data: DepositFormData) {
    setIsSubmitting(true);
    try {
      // Simulate deposit transaction
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: t('common.success'),
        description: t('pools.deposit.success_message', { 
          amount: formatCurrency(Number(data.amount)), 
          pool: pool.name
        }),
      });

      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('pools.deposit.error'),
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
                {t('pools.deposit.title')} {pool.name}
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{t('pools.deposit.tooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </DialogTitle>
              <DialogDescription>
                {t('pools.deposit.step', {
                  current: currentStep + 1,
                  total: STEPS.length,
                  name: t(`pools.deposit.steps.${STEPS[currentStep]}`)
                })}
              </DialogDescription>
              <Progress
                value={((currentStep + 1) / STEPS.length) * 100}
                className="h-1"
              />
            </DialogHeader>

            {currentStep === 0 && (
              <div className="space-y-4">
                <Alert className="bg-muted">
                  <AlertDescription>
                    {t('pools.deposit.beginner_note')}
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pools.deposit.amount_label')}</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                              className="pl-7 text-lg"
                              {...field}
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          </div>

                          {amount > 0 && (
                            <div className="space-y-3">
                              <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">
                                    {t('pools.deposit.estimated_daily')}
                                  </span>
                                  <span className="font-medium text-green-500">
                                    +{formatCurrency(estimatedDailyYield)}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">
                                    {t('pools.deposit.estimated_yearly')}
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

                              {amount >= 100 && (
                                <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg border">
                                  <p>{t('pools.deposit.yearly_impact', {
                                    yield: formatCurrency(estimatedYearlyYield),
                                    coffees: yearlyCoffees
                                  })}</p>
                                </div>
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

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                  <h3 className="font-medium">{t('pools.deposit.summary')}</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('pools.deposit.amount')}</span>
                      <span className="font-medium">{formatCurrency(amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('pools.deposit.pool')}</span>
                      <span className="font-medium">{pool.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">APR</span>
                      <span className="font-medium text-green-500">{pool.apr}%</span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    {t('pools.deposit.confirmation_note')}
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
                  {t('common.back')}
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
                disabled={isSubmitting || (currentStep === 0 && !form.formState.isValid)}
                className="flex-1"
              >
                {currentStep === STEPS.length - 1 ? (
                  isSubmitting ? t('common.processing') : t('pools.deposit.confirm')
                ) : (
                  <>
                    {t('common.next')}
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