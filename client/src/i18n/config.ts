import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          common: {
            connect_wallet: 'Connect Wallet',
            disconnect_wallet: 'Disconnect',
            dashboard: 'Dashboard',
            pools: 'Pools',
            portfolio: 'Portfolio',
            total_value: 'Total Value',
            total_pnl: 'Total P&L',
            apr: 'APR',
            tvl: 'TVL',
            volume_24h: '24h Volume',
            deposit: 'Deposit',
            withdraw: 'Withdraw',
            history: 'History',
          },
          pools: {
            title: 'Liquidity Pools',
            description: 'Manage your liquidity positions',
            fee_tier: 'Fee Tier',
            daily_fees: 'Daily Fees',
            weekly_volume: 'Weekly Volume',
            risk_level: 'Risk Level',
            impermanent_loss: 'Impermanent Loss',
            utilization: 'Utilization',
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            high_il_warning: 'High impermanent loss risk detected. Consider your position carefully.',
            analytics: {
              volume_trend: 'Volume Trend',
              performance: 'Performance Metrics',
              risk_metrics: 'Risk Analysis',
              price_impact: 'Price Impact',
            }
          },
          portfolio: {
            title: 'Portfolio',
            description: 'Track your liquidity positions and returns',
            current_value: 'Current Value',
            value_change_24h: '24h Change',
            performance: 'Performance',
            active_positions: 'Active Positions',
            pool_share: 'Pool Share',
            daily_yield: 'Daily Yield',
            entry_date: 'Entry Date',
          },
          history: {
            title: 'History',
            description: 'View your complete transaction history',
            activity_log: 'Activity Log',
            transaction_type: {
              deposit: 'Deposit',
              withdraw: 'Withdraw',
              position_closed: 'Position Closed'
            },
            initial_investment: 'Initial Investment',
            duration: 'Duration',
            profit_loss: 'P&L',
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
        },
      },
      es: {
        translation: {
          common: {
            connect_wallet: 'Conectar Billetera',
            disconnect_wallet: 'Desconectar',
            dashboard: 'Panel',
            pools: 'Pools',
            portfolio: 'Portafolio',
            total_value: 'Valor Total',
            total_pnl: 'Ganancias y Pérdidas',
            apr: 'TAE',
            tvl: 'VTB',
            volume_24h: 'Volumen 24h',
            deposit: 'Depositar',
            withdraw: 'Retirar',
            history: 'Historial',
          },
          pools: {
            title: 'Pools de Liquidez',
            description: 'Gestiona tus posiciones de liquidez',
            fee_tier: 'Nivel de Comisión',
            daily_fees: 'Comisiones Diarias',
            weekly_volume: 'Volumen Semanal',
            risk_level: 'Nivel de Riesgo',
            impermanent_loss: 'Pérdida Impermanente',
            utilization: 'Utilización',
            low: 'Bajo',
            medium: 'Medio',
            high: 'Alto',
            high_il_warning: 'Alto riesgo de pérdida impermanente detectado. Considera tu posición cuidadosamente.',
            analytics: {
              volume_trend: 'Tendencia de Volumen',
              performance: 'Métricas de Rendimiento',
              risk_metrics: 'Análisis de Riesgo',
              price_impact: 'Impacto en el Precio',
            }
          },
          portfolio: {
            title: 'Portafolio',
            description: 'Rastrea tus posiciones de liquidez y rendimientos',
            current_value: 'Valor Actual',
            value_change_24h: 'Cambio 24h',
            performance: 'Rendimiento',
            active_positions: 'Posiciones Activas',
            pool_share: 'Participación en Pool',
            daily_yield: 'Rendimiento Diario',
            entry_date: 'Fecha de Entrada',
          },
          history: {
            title: 'Historial',
            description: 'Ver tu historial completo de transacciones',
            activity_log: 'Registro de Actividad',
            transaction_type: {
              deposit: 'Depósito',
              withdraw: 'Retiro',
              position_closed: 'Posición Cerrada'
            },
            initial_investment: 'Inversión Inicial',
            duration: 'Duración',
            profit_loss: 'Ganancias/Pérdidas',
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
        },
      },
      ja: {
        translation: {
          common: {
            connect_wallet: 'ウォレットを接続',
            disconnect_wallet: '切断',
            dashboard: 'ダッシュボード',
            pools: 'プール',
            portfolio: 'ポートフォリオ',
            total_value: '総額',
            total_pnl: '損益',
            apr: '年利率',
            tvl: 'ロック済み総額',
            volume_24h: '24時間取引量',
            deposit: '預入',
            withdraw: '引出',
            history: '履歴',
          },
          pools: {
            title: '流動性プール',
            description: '流動性ポジションを管理',
            fee_tier: '手数料層',
            daily_fees: '日次手数料',
            weekly_volume: '週間取引量',
            risk_level: 'リスクレベル',
            impermanent_loss: '非永続的損失',
            utilization: '利用率',
            low: '低',
            medium: '中',
            high: '高',
            high_il_warning: '高い非永続的損失リスクが検出されました。慎重にポジションを検討してください。',
            analytics: {
              volume_trend: '取引量トレンド',
              performance: 'パフォーマンス指標',
              risk_metrics: 'リスク分析',
              price_impact: '価格影響',
            }
          },
          portfolio: {
            title: 'ポートフォリオ',
            description: '流動性ポジションとリターンを追跡',
            current_value: '現在価値',
            value_change_24h: '24時間変動',
            performance: 'パフォーマンス',
            active_positions: 'アクティブポジション',
            pool_share: 'プールシェア',
            daily_yield: '日次利回り',
            entry_date: '開始日',
          },
          history: {
            title: '履歴',
            description: '取引履歴の完全な記録を表示',
            activity_log: 'アクティビティログ',
            transaction_type: {
              deposit: '預入',
              withdraw: '引出',
              position_closed: 'ポジション終了'
            },
            initial_investment: '初期投資',
            duration: '期間',
            profit_loss: '損益',
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
        },
      },
      tr: {
        translation: {
          common: {
            connect_wallet: 'Cüzdan Bağla',
            disconnect_wallet: 'Bağlantıyı Kes',
            dashboard: 'Panel',
            pools: 'Havuzlar',
            portfolio: 'Portföy',
            total_value: 'Toplam Değer',
            total_pnl: 'Toplam Kar/Zarar',
            apr: 'Yıllık Getiri',
            tvl: 'Kilitli Toplam Değer',
            volume_24h: '24s Hacim',
            deposit: 'Yatır',
            withdraw: 'Çek',
            history: 'Geçmiş',
          },
          pools: {
            title: 'Likidite Havuzları',
            description: 'Likidite pozisyonlarınızı yönetin',
            fee_tier: 'Komisyon Seviyesi',
            daily_fees: 'Günlük Komisyonlar',
            weekly_volume: 'Haftalık Hacim',
            risk_level: 'Risk Seviyesi',
            impermanent_loss: 'Geçici Kayıp',
            utilization: 'Kullanım Oranı',
            low: 'Düşük',
            medium: 'Orta',
            high: 'Yüksek',
            high_il_warning: 'Yüksek geçici kayıp riski tespit edildi. Pozisyonunuzu dikkatlice değerlendirin.',
            analytics: {
              volume_trend: 'Hacim Trendi',
              performance: 'Performans Metrikleri',
              risk_metrics: 'Risk Analizi',
              price_impact: 'Fiyat Etkisi',
            }
          },
          portfolio: {
            title: 'Portföy',
            description: 'Likidite pozisyonlarınızı ve getirilerinizi takip edin',
            current_value: 'Mevcut Değer',
            value_change_24h: '24s Değişim',
            performance: 'Performans',
            active_positions: 'Aktif Pozisyonlar',
            pool_share: 'Havuz Payı',
            daily_yield: 'Günlük Getiri',
            entry_date: 'Giriş Tarihi',
          },
          history: {
            title: 'Geçmiş',
            description: 'Tüm işlem geçmişinizi görüntüleyin',
            activity_log: 'Aktivite Kaydı',
            transaction_type: {
              deposit: 'Yatırma',
              withdraw: 'Çekme',
              position_closed: 'Pozisyon Kapatıldı'
            },
            initial_investment: 'İlk Yatırım',
            duration: 'Süre',
            profit_loss: 'Kar/Zarar',
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;