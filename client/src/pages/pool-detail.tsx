import { useRoute } from "wouter";
import { pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { PoolAnalytics } from "@/components/pools/pool-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DepositDialog } from "@/components/pools/deposit-dialog";
import { useTranslation } from "react-i18next";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-8 w-8 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-8 w-8 text-blue-500" />;
    case 'SOL':
      return <CoinsIcon className="h-8 w-8 text-purple-500" />;
    default:
      return <CoinsIcon className="h-8 w-8 text-gray-500" />;
  }
};

export default function PoolDetail() {
  const [, params] = useRoute("/pools/:id");
  const { t } = useTranslation();
  const [showDepositDialog, setShowDepositDialog] = useState(false);

  const pool = pools.find(p => p.id === Number(params?.id));

  if (!pool) {
    return <div>Pool not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <TokenIcon symbol={pool.token0} />
            <TokenIcon symbol={pool.token1} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{pool.name}</h2>
            <p className="text-muted-foreground">
              {t('pools.detailed_view')}
            </p>
          </div>
        </div>
        <Button onClick={() => setShowDepositDialog(true)}>
          {t('common.deposit')}
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t('common.tvl')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(Number(pool.tvl))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t('common.apr')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {pool.apr}%
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t('pools.utilization')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pool.utilizationRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <PoolAnalytics pool={pool} />
      </div>

      {showDepositDialog && (
        <DepositDialog
          pool={pool}
          isOpen={showDepositDialog}
          onClose={() => setShowDepositDialog(false)}
        />
      )}
    </div>
  );
}
