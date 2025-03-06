import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

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
  },
  pool_activity: {
    term: "Pool Activity",
    explanation: "How actively the pool is being used for trading and yield generation, indicating the pool's current momentum."
  },
  yield_farming: {
    term: "Yield Farming",
    explanation: "Strategy of staking or lending crypto assets to generate high returns in the form of additional cryptocurrency."
  },
  smart_contract: {
    term: "Smart Contract",
    explanation: "Self-executing code on a blockchain that automatically implements the terms of an agreement when predetermined conditions are met."
  },
  gas_fee: {
    term: "Gas Fee",
    explanation: "Transaction fee paid to network validators for processing transactions on a blockchain network."
  },
  amm: {
    term: "AMM",
    explanation: "Automated Market Maker - A decentralized exchange protocol that uses liquidity pools to enable automatic trading."
  },
  protocol_fee: {
    term: "Protocol Fee",
    explanation: "Fee charged by a DeFi platform that goes to the protocol treasury or is distributed to governance token holders."
  },
  utilization_rate: {
    term: "Utilization Rate",
    explanation: "The percentage of available assets in a pool that are currently being lent out or used."
  }
} as const;

type DefiTerm = keyof typeof DEFI_TERMS;

interface DefiTooltipProps {
  term: DefiTerm;
  children: React.ReactNode;
  className?: string;
}

export const DefiTooltip = memo(function DefiTooltip({ term, children, className = "" }: DefiTooltipProps) {
  const { t } = useTranslation();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={`inline-flex items-center gap-1 cursor-help ${className}`}>
            {children}
            <HelpCircle className="h-4 w-4 text-primary/60" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4 space-y-2 bg-card border">
          <p className="font-semibold text-lg">{DEFI_TERMS[term].term}</p>
          <p className="text-sm text-muted-foreground">
            {t(`defi.terms.${term}`, DEFI_TERMS[term].explanation)}
          </p>
          {term === 'impermanent_loss' && (
            <p className="text-xs text-yellow-500 italic mt-1">
              {t('defi.terms.risk_note', "High levels can significantly impact returns. Consider your risk tolerance.")}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export type { DefiTerm };