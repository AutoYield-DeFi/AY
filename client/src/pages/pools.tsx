import { PoolList } from "@/components/pools/pool-list";
import { useTranslation } from "react-i18next";

export default function Pools() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('pools.title')}</h2>
        <p className="text-muted-foreground">
          {t('pools.description')}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PoolList />
      </div>
    </div>
  );
}