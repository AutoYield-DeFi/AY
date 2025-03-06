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
import { Info, ChevronRight, ChevronLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DefiTooltip } from "@/components/ui/defi-tooltip";

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

// Risk level indicator component
const RiskBadge = ({ level }: { level: string }) => {
  const colors = {
    low: "bg-green-500/20 text-green-600 border-green-600/30",
    medium: "bg-yellow-500/20 text-yellow-600 border-yellow-600/30",
    high: "bg-red-500/20 text-red-600 border-red-600/30",
  };

  const colorClass = colors[level.toLowerCase() as keyof typeof colors] || "bg-gray-500/20 text-gray-600 border-gray-600/30";

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colorClass}`}>
      <ShieldCheck className="w-3 h-3 mr-1" />
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
};

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
      <DialogContent className="sm:max-w-[460px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle>{t('pools.deposit.title', { poolName: pool.name })}</DialogTitle>
                <RiskBadge level={pool.riskLevel} />
              </div>
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
                        <div className="relative">
                          <Input
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            className="font-medium text-lg pl-7"
                            {...field}
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        </div>
                        {amount > 0 && (
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                              <div className="flex items-center justify-between mb-1">
                                <DefiTooltip term="pool_share" className="text-sm text-muted-foreground">
                                  {t('pools.deposit.pool_share')}
                                </DefiTooltip>
                                <span className="font-medium">
                                  {((amount / Number(pool.tvl)) * 100).toFixed(4)}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <DefiTooltip term="apr" className="text-sm text-muted-foreground">
                                  {t('pools.deposit.annual_yield')}
                                </DefiTooltip>
                                <span className="font-medium text-green-500 flex items-center">
                                  <ArrowUpRight className="h-3 w-3 mr-1" />
                                  {formatCurrency(estimatedYearlyYield)}
                                </span>
                              </div>
                            </div>

                            {amount >= 100 && (
                              <div className="text-xs text-muted-foreground p-2 bg-muted/40 rounded border">
                                <p>{t('pools.deposit.yearly_impact', {
                                  yield: formatCurrency(estimatedYearlyYield),
                                  coffees: yearlyCoffees
                                }, `This investment could generate ${formatCurrency(estimatedYearlyYield)} annually - enough for about ${yearlyCoffees} coffees!`)}</p>
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
                      <DefiTooltip term="apr" className="text-sm text-muted-foreground">
                        {t('pools.deposit.estimated_apr')}
                      </DefiTooltip>
                      <span className="font-medium text-green-500">{estimatedAPR.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t('pools.deposit.daily_yield')}</span>
                      <span className="font-medium text-green-500">+{formatCurrency(estimatedDailyYield)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t('pools.deposit.yearly_yield')}</span>
                      <span className="font-medium text-green-500">+{formatCurrency(estimatedYearlyYield)}</span>
                    </div>
                  </div>
                </div>

                {Number(pool.impermanentLoss) > 2 && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <DefiTooltip term="impermanent_loss" className="text-sm font-medium text-yellow-600">
                          {t('pools.deposit.risk_note')}
                        </DefiTooltip>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('pools.deposit.risk_explanation', { percentage: pool.impermanentLoss })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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