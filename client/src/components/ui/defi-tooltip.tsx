import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

// Define all DeFi terms and their explanations
const DEFI_TERMS = {
  apr: {
    term: "APR",
    explanation: "Annual Percentage Rate - The yearly interest rate earned on your investment, excluding compound interest."
  },
  apy: {
    term: "APY",
    explanation: "Annual Percentage Yield - The total return on investment over a year, including compound interest."
  },
  tvl: {
    term: "TVL",
    explanation: "Total Value Locked - The total amount of assets deposited in a DeFi protocol."
  },
  impermanent_loss: {
    term: "Impermanent Loss",
    explanation: "Temporary loss of funds when providing liquidity to a pool, caused by changes in the price ratio of paired tokens."
  },
  liquidity: {
    term: "Liquidity",
    explanation: "The ease with which an asset can be converted to cash or traded without affecting its market price."
  },
  pool_share: {
    term: "Pool Share",
    explanation: "Your percentage ownership of the total assets in a liquidity pool."
  },
  slippage: {
    term: "Slippage",
    explanation: "The difference between expected and actual price due to market movement during transaction processing."
  }
} as const;

type DefiTerm = keyof typeof DEFI_TERMS;

interface DefiTooltipProps {
  term: DefiTerm;
  children: React.ReactNode;
}

export const DefiTooltip = memo(function DefiTooltip({ term, children }: DefiTooltipProps) {
  const { t } = useTranslation();
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {children}
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-medium">{DEFI_TERMS[term].term}</p>
          <p className="text-sm text-muted-foreground">
            {t(`defi.terms.${term}`, DEFI_TERMS[term].explanation)}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export type { DefiTerm };
