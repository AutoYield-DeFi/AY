import { AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function NoticeBoard() {
  const { t } = useTranslation();

  const notices = [
    {
      type: "info",
      title: t('dashboard.notices.high_yield_title'),
      message: t('dashboard.notices.high_yield_message'),
      icon: Info
    },
    {
      type: "warning",
      title: t('dashboard.notices.market_update_title'),
      message: t('dashboard.notices.market_update_message'),
      icon: AlertCircle
    }
  ];

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>{t('dashboard.notices.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notices.map((notice, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                notice.type === 'warning' 
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : 'bg-blue-500/10 text-blue-500'
              }`}
            >
              <notice.icon className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">{notice.title}</h3>
                <p className="text-sm mt-1 opacity-90">{notice.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
