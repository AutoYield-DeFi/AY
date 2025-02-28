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

const STEPS = ["amount", "token_split"] as const;

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
        title: t('common.success'),
        description: t('pools.deposit.success_message', { 
          amount: formatCurrency(Number(data.amount)), 
          pool: pool.name,
          token0Amount: token0Amount.toFixed(6),
          token1Amount: token1Amount.toFixed(6)
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
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>{t('pools.deposit.title', { poolName: pool.name })}</DialogTitle>
              <DialogDescription>
                {t('pools.deposit.step', {
                  current: currentStep + 1,
                  total: STEPS.length,
                  name: t(`pools.deposit.steps.${STEPS[currentStep]}`)
                })}
              </DialogDescription>
              <Progress
                value={((currentStep + 1) / STEPS.length) * 100}
                className="h-1 bg-primary/20"
              />
            </DialogHeader>

            {currentStep === 0 && (
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pools.deposit.amount_label')}</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          className="font-medium text-lg"
                          {...field}
                        />
                        {amount > 0 && (
                          <div className="text-sm space-y-1.5 p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">{t('pools.deposit.pool_share')}:</span>
                              <span className="font-medium">
                                {((amount / Number(pool.tvl)) * 100).toFixed(4)}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">{t('pools.deposit.annual_yield')}:</span>
                              <span className="font-medium text-green-500">
                                +{formatCurrency(estimatedYearlyYield)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t('pools.deposit.token_split')}</h3>
                  <div className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pool.token0}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-primary/60" />
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('pools.deposit.current_price')}: {formatCurrency(Number(pool.token0Price))}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="font-medium">{token0Amount.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pool.token1}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-primary/60" />
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('pools.deposit.current_price')}: {formatCurrency(Number(pool.token1Price))}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="font-medium">{token1Amount.toFixed(6)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{t('pools.deposit.expected_returns')}</h3>
                  <div className="space-y-3 p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('pools.deposit.estimated_apr')}</span>
                      <span className="font-medium text-green-500">{estimatedAPR.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('pools.deposit.daily_yield')}</span>
                      <span className="font-medium text-green-500">+{formatCurrency(estimatedDailyYield)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('pools.deposit.yearly_yield')}</span>
                      <span className="font-medium text-green-500">+{formatCurrency(estimatedYearlyYield)}</span>
                    </div>
                  </div>
                </div>
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
                  {t('pools.deposit.back')}
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
                  {t('pools.deposit.cancel')}
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
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {currentStep === STEPS.length - 1 ? (
                  isSubmitting ? t('pools.deposit.processing') : t('pools.deposit.confirm')
                ) : (
                  <>
                    {t('pools.deposit.next')}
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