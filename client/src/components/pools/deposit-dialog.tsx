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

export function DepositDialog({ pool, isOpen, onClose }: DepositDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
    },
  });

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit into {pool.name}</DialogTitle>
          <DialogDescription>
            Current APR: {pool.apr}% • TVL: {formatCurrency(pool.tvl)}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USDC)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
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
                {isSubmitting ? "Processing..." : "Deposit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
