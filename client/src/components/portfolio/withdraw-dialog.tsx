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
import { Info, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

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

const STEPS = ["amount", "review"] as const;

export function WithdrawDialog({ position, isOpen, onClose }: WithdrawDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
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
      // Simulate withdrawal transaction
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: t('common.success'),
        description: t('portfolio.withdraw.success_message', {
          amount: formatCurrency(withdrawAmount),
          pool: pool?.name,
          pnl: estimatedPnL >= 0 ? `+${formatCurrency(estimatedPnL)}` : formatCurrency(estimatedPnL)
        }),
      });

      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('portfolio.withdraw.error_message'),
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
              <DialogTitle className="flex items-center gap-2">
                {t('portfolio.withdraw.title')} {pool?.name}
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{t('portfolio.withdraw.tooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </DialogTitle>
              <DialogDescription>
                {t('portfolio.withdraw.step', {
                  current: currentStep + 1,
                  total: STEPS.length,
                  name: t(`portfolio.withdraw.steps.${STEPS[currentStep]}`)
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
                    {t('portfolio.withdraw.info_note')}
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('portfolio.withdraw.amount_label')} ({field.value}%)
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            value={[field.value]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={([value]) => field.onChange(value)}
                            className="pt-2"
                          />
                          <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                {t('portfolio.withdraw.current_value')}
                              </span>
                              <span className="font-medium">
                                {formatCurrency(position.value)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                {t('portfolio.withdraw.withdraw_amount')}
                              </span>
                              <span className="font-medium">
                                {formatCurrency(withdrawAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                {t('portfolio.withdraw.estimated_pnl')}
                              </span>
                              <span className={`font-medium ${estimatedPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {estimatedPnL >= 0 ? '+' : ''}{formatCurrency(estimatedPnL)}
                              </span>
                            </div>
                          </div>
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
                  <h3 className="font-medium">{t('portfolio.withdraw.summary')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t('portfolio.withdraw.percentage')}
                      </span>
                      <span className="font-medium">
                        {form.watch("percentage")}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t('portfolio.withdraw.amount')}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(withdrawAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t('portfolio.withdraw.realized_pnl')}
                      </span>
                      <span className={`font-medium ${estimatedPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {estimatedPnL >= 0 ? '+' : ''}{formatCurrency(estimatedPnL)}
                      </span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    {t('portfolio.withdraw.confirmation_note')}
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
                disabled={isSubmitting}
                className="flex-1"
              >
                {currentStep === STEPS.length - 1 ? (
                  isSubmitting ? t('common.processing') : t('portfolio.withdraw.confirm')
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