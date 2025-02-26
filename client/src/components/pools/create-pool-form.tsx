import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";

// Define supported tokens
const supportedTokens = [
  { symbol: "BTC", name: "Bitcoin", icon: SiBitcoin },
  { symbol: "ETH", name: "Ethereum", icon: SiEthereum },
  { symbol: "SOL", name: "Solana", icon: CoinsIcon },
  { symbol: "USDC", name: "USD Coin", icon: CoinsIcon },
];

// Schema for form validation
const createPoolSchema = z.object({
  token0: z.string().min(1, "First token is required"),
  token1: z.string().min(1, "Second token is required"),
  initialLiquidity0: z.string()
    .min(1, "Initial liquidity is required")
    .refine(val => !isNaN(Number(val)), "Must be a valid number")
    .refine(val => Number(val) > 0, "Amount must be greater than 0"),
  initialLiquidity1: z.string()
    .min(1, "Initial liquidity is required")
    .refine(val => !isNaN(Number(val)), "Must be a valid number")
    .refine(val => Number(val) > 0, "Amount must be greater than 0"),
  fee: z.string().min(1, "Fee tier is required"),
}).refine(data => data.token0 !== data.token1, {
  message: "Tokens must be different",
  path: ["token1"],
});

type CreatePoolFormData = z.infer<typeof createPoolSchema>;

export function CreatePoolForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreatePoolFormData>({
    resolver: zodResolver(createPoolSchema),
    defaultValues: {
      token0: "",
      token1: "",
      initialLiquidity0: "",
      initialLiquidity1: "",
      fee: "0.3",
    },
  });

  async function onSubmit(data: CreatePoolFormData) {
    setIsSubmitting(true);
    try {
      // Simulate pool creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Pool Created!",
        description: `Successfully created ${data.token0}-${data.token1} pool`,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create pool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>Create New Pool</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="token0"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token 1</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supportedTokens.map(token => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center space-x-2">
                              <token.icon className="h-4 w-4" />
                              <span>{token.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token 2</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supportedTokens.map(token => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center space-x-2">
                              <token.icon className="h-4 w-4" />
                              <span>{token.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="initialLiquidity0"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Liquidity (Token 1)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        type="number"
                        step="0.000001"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="initialLiquidity1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Liquidity (Token 2)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        type="number"
                        step="0.000001"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Tier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0.01">0.01% - Best for stable pairs</SelectItem>
                        <SelectItem value="0.05">0.05% - Best for stable pairs</SelectItem>
                        <SelectItem value="0.3">0.3% - Best for most pairs</SelectItem>
                        <SelectItem value="1">1% - Best for exotic pairs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Pool..." : "Create Pool"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
