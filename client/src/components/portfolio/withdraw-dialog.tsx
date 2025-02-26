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
import type { Position } from "@shared/schema";
import { pools } from "@/lib/mock-data";

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

export function WithdrawDialog({ position, isOpen, onClose }: WithdrawDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pool = pools.find(p => p.id === position.poolId);

  const form = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      percentage: 100,
    },
  });

  const withdrawAmount = (position.value * form.watch("percentage")) / 100;

  async function onSubmit(data: WithdrawFormData) {
    setIsSubmitting(true);
    try {
      // Simulate withdrawal transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: `Withdrawn ${formatCurrency(withdrawAmount)} from ${pool?.name} pool`,
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw from {pool?.name}</DialogTitle>
          <DialogDescription>
            Position Value: {formatCurrency(position.value)} • P&L: {
              position.pnl >= 0 ? "+" : ""
            }{formatCurrency(position.pnl)}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Withdrawal Amount ({field.value}%)</FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={([value]) => field.onChange(value)}
                      className="pt-2"
                    />
                  </FormControl>
                  <div className="text-sm text-muted-foreground">
                    You will receive approximately {formatCurrency(withdrawAmount)}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Withdraw"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
