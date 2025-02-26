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
            },
            not_found: 'Pool not found',
            details_description: 'Pool Details and Performance',
            high_il_warning_title: 'High Impermanent Loss Risk',
            high_il_warning: 'This pool currently has a higher risk of impermanent loss ({{percentage}}%). Consider your investment carefully and start with a smaller position if you\'re new to DeFi.',
            annual_rate: 'Annual percentage rate',
            trading_volume: 'Last 24 hours trading',
            earned_24h: 'Earned in last 24h',
            total_locked: 'Total value locked',
            token_information: 'Token Information',
            primary_token: 'Primary Token',
            paired_token: 'Paired Token',
            current_price: 'Current Price',
            pool_reserve: 'Pool Reserve',
            tvl_history: 'TVL History',
            metrics: 'Pool Metrics',
            risk_profile: 'Risk Profile',
            volume_metrics: 'Volume Metrics',
            pool_health: 'Pool Health',
            price_ratio: 'Price Ratio',
            weekly_fees: 'Weekly Fees',
            deposit: {
              title: 'Deposit into {{poolName}}',
              step: 'Step {{current}} of {{total}}: {{name}}',
              amount_label: 'Amount (USDC)',
              pool_share: 'Pool Share',
              annual_yield: 'Annual Yield (est.)',
              token_split: 'Token Split Preview',
              expected_returns: 'Expected Returns',
              estimated_apr: 'Estimated APR',
              daily_yield: 'Daily Yield',
              yearly_yield: 'Yearly Yield',
              deposit_summary: 'Deposit Summary',
              total_value: 'Total Value',
              warning: 'Please review the details carefully. Once confirmed, this action cannot be undone.',
              current_price: 'Current price',
              steps: {
                amount: 'Amount',
                token_split: 'Token Split',
                confirmation: 'Confirmation'
              },
              back: 'Back',
              next: 'Next',
              cancel: 'Cancel',
              confirm: 'Confirm Deposit',
              processing: 'Processing...',
            },
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
          dashboard: {
            title: 'Dashboard',
            description: 'Overview of your AutoYield performance',
            notices: {
              title: 'Noticeboard',
              high_yield_title: 'High Yield Opportunity',
              high_yield_message: 'SOL-USDC pool currently offering 25.5% APR. Consider increasing your position.',
              market_update_title: 'Market Update',
              market_update_message: 'Higher than usual market volatility expected this week. Monitor your positions closely.',
            },
            recent_activity: 'Recent Activity',
            portfolio_summary: 'Portfolio Summary',
            total_value: 'Total Value',
            average_apr: 'Average APR',
            total_yield: 'Total Yield',
          }
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
            },
            not_found: 'Pool no encontrado',
            details_description: 'Detalles y Rendimiento del Pool',
            high_il_warning_title: 'Alto Riesgo de Pérdida Impermanente',
            high_il_warning: 'Este pool actualmente tiene un mayor riesgo de pérdida impermanente ({{percentage}}%). Considere su inversión cuidadosamente y comience con una posición más pequeña si es nuevo en DeFi.',
            annual_rate: 'Tasa porcentual anual',
            trading_volume: 'Comercio de las últimas 24 horas',
            earned_24h: 'Ganado en las últimas 24h',
            total_locked: 'Valor total bloqueado',
            token_information: 'Información del Token',
            primary_token: 'Token principal',
            paired_token: 'Token pareado',
            current_price: 'Precio actual',
            pool_reserve: 'Reserva del Pool',
            tvl_history: 'Historial de TVL',
            metrics: 'Métricas del Pool',
            risk_profile: 'Perfil de Riesgo',
            volume_metrics: 'Métricas de Volumen',
            pool_health: 'Salud del Pool',
            price_ratio: 'Proporción de Precios',
            weekly_fees: 'Comisiones Semanales',
            deposit: {
              title: 'Depositar en {{poolName}}',
              step: 'Paso {{current}} de {{total}}: {{name}}',
              amount_label: 'Cantidad (USDC)',
              pool_share: 'Participación en Pool',
              annual_yield: 'Rendimiento Anual (est.)',
              token_split: 'Vista Previa de la Distribución de Tokens',
              expected_returns: 'Retorno Esperado',
              estimated_apr: 'TAE Estimada',
              daily_yield: 'Rendimiento Diario',
              yearly_yield: 'Rendimiento Anual',
              deposit_summary: 'Resumen del Depósito',
              total_value: 'Valor Total',
              warning: 'Por favor, revise los detalles cuidadosamente. Una vez confirmado, esta acción no se puede deshacer.',
              current_price: 'Precio actual',
              steps: {
                amount: 'Cantidad',
                token_split: 'Distribución de Tokens',
                confirmation: 'Confirmación'
              },
              back: 'Atrás',
              next: 'Siguiente',
              cancel: 'Cancelar',
              confirm: 'Confirmar Depósito',
              processing: 'Procesando...',
            },
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
          dashboard: {
            title: 'Panel',
            description: 'AutoYield performans özeti',
            notices: {
              title: 'Duyuru Panosu',
              high_yield_title: 'Yüksek Getiri Fırsatı',
              high_yield_message: 'SOL-USDC havuzu şu anda %25.5 APR sunuyor. Pozisyonunuzu artırmayı düşünün.',
              market_update_title: 'Piyasa Güncellemesi',
              market_update_message: 'Bu hafta normalden daha yüksek piyasa volatilitesi bekleniyor. Pozisyonlarınızı yakından takip edin.',
            },
            recent_activity: 'Son Aktiviteler',
            portfolio_summary: 'Portföy Özeti',
            total_value: 'Toplam Değer',
            average_apr: 'Ortalama APR',
            total_yield: 'Toplam Getiri',
          }
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
            },
            not_found: 'プールが見つかりません',
            details_description: 'プール詳細とパフォーマンス',
            high_il_warning_title: '高い非永続的損失リスク',
            high_il_warning: 'このプールは現在、より高い非永続的損失のリスク（{{percentage}}％）があります。投資を慎重に検討し、DeFi初心者の方は少額から始めてください。',
            annual_rate: '年間利率',
            trading_volume: '過去24時間の取引',
            earned_24h: '過去24時間の収益',
            total_locked: 'ロックされた総額',
            token_information: 'トークン情報',
            primary_token: '主要トークン',
            paired_token: 'ペアトークン',
            current_price: '現在の価格',
            pool_reserve: 'プールの準備金',
            tvl_history: 'TVL履歴',
            metrics: 'プールの指標',
            risk_profile: 'リスクプロファイル',
            volume_metrics: '出来高指標',
            pool_health: 'プールの状況',
            price_ratio: '価格比率',
            weekly_fees: '週間手数料',
            deposit: {
              title: '{{poolName}}に預ける',
              step: '{{total}}のうち{{current}}ステップ目：{{name}}',
              amount_label: '数量(USDC)',
              pool_share: 'プールシェア',
              annual_yield: '年間利回り(概算)',
              token_split: 'トークンスプリットプレビュー',
              expected_returns: '予想リターン',
              estimated_apr: '推定APR',
              daily_yield: '日次利回り',
              yearly_yield: '年間利回り',
              deposit_summary: '預入サマリー',
              total_value: '総額',
              warning: '詳細を注意深く確認してください。確認後、この操作は取り消せません。',
              current_price: '現在の価格',
              steps: {
                amount: '数量',
                token_split: 'トークンスプリット',
                confirmation: '確認'
              },
              back: '戻る',
              next: '次へ',
              cancel: 'キャンセル',
              confirm: '預入確認',
              processing: '処理中...',
            },
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
          dashboard: {
            title: 'ダッシュボード',
            description: 'AutoYieldのパフォーマンス概要',
            notices: {
              title: '通知ボード',
              high_yield_title: '高利回り機会',
              high_yield_message: 'SOL-USDCプールが現在25.5%のAPRを提供中。ポジション増加をご検討ください。',
              market_update_title: '市場アップデート',
              market_update_message: '今週は通常より高い市場変動性が予想されます。ポジションを注意深く監視してください。',
            },
            recent_activity: '最近のアクティビティ',
            portfolio_summary: 'ポートフォリオ概要',
            total_value: '総額',
            average_apr: '平均APR',
            total_yield: '総利回り',
          }
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
            },
            not_found: 'Havuz bulunamadı',
            details_description: 'Havuz Detayları ve Performansı',
            high_il_warning_title: 'Yüksek Geçici Kayıp Riski',
            high_il_warning: 'Bu havuz şu anda daha yüksek geçici kayıp riski taşımaktadır ({{percentage}}%). Yatırımınızı dikkatlice değerlendirin ve DeFi\'ye yeniyseniz daha küçük bir pozisyonla başlayın.',
            annual_rate: 'Yıllık yüzdesel oran',
            trading_volume: 'Son 24 saatlik işlem hacmi',
            earned_24h: 'Son 24 saatte kazanılan',
            total_locked: 'Toplam kilitli değer',
            token_information: 'Token Bilgileri',
            primary_token: 'Birincil Token',
            paired_token: 'Eşleştirilmiş Token',
            current_price: 'Güncel Fiyat',
            pool_reserve: 'Havuz Rezervi',
            tvl_history: 'TVL Geçmişi',
            metrics: 'Havuz Metrikleri',
            risk_profile: 'Risk Profili',
            volume_metrics: 'Hacim Metrikleri',
            pool_health: 'Havuz Sağlığı',
            price_ratio: 'Fiyat Oranı',
            weekly_fees: 'Haftalık Komisyonlar',
            deposit: {
              title: '{{poolName}} Havuzuna Yatır',
              step: '{{total}} Adımından {{current}}. Adım: {{name}}',
              amount_label: 'Miktar (USDC)',
              pool_share: 'Havuz Payı',
              annual_yield: 'Yıllık Getiri (tahmini)',
              token_split: 'Token Dağılımı Önizlemesi',
              expected_returns: 'Beklenen Getiri',
              estimated_apr: 'Tahmini Yıllık Getiri',
              daily_yield: 'Günlük Getiri',
              yearly_yield: 'Yıllık Getiri',
              deposit_summary: 'Yatırım Özeti',
              total_value: 'Toplam Değer',
              warning: 'Lütfen detayları dikkatlice inceleyin. Onaylamadan sonra bu işlem geri alınamaz.',
              current_price: 'Güncel fiyat',
              steps: {
                amount: 'Miktar',
                token_split: 'Token Dağılımı',
                confirmation: 'Onay'
              },
              back: 'Geri',
              next: 'İleri',
              cancel: 'İptal',
              confirm: 'Yatırımı Onayla',
              processing: 'İşlem Yapılıyor...',
            },
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
          dashboard: {
            title: 'Panel',
            description: 'AutoYield performans özeti',
            notices: {
              title: 'Duyuru Panosu',
              high_yield_title: 'Yüksek Getiri Fırsatı',
              high_yield_message: 'SOL-USDC havuzu şu anda %25.5 APR sunuyor. Pozisyonunuzu artırmayı düşünün.',
              market_update_title: 'Piyasa Güncellemesi',
              market_update_message: 'Bu hafta normalden daha yüksek piyasa volatilitesi bekleniyor. Pozisyonlarınızı yakından takip edin.',
            },
            recent_activity: 'Son Aktiviteler',
            portfolio_summary: 'Portföy Özeti',
            total_value: 'Toplam Değer',
            average_apr: 'Ortalama APR',
            total_yield: 'Toplam Getiri',
          }
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;