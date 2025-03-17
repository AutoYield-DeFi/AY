import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
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
            profit_loss: 'Profit/Loss',
            total_pnl: 'Total P&L',
            pnl: 'P&L',
            apr: 'APR',
            tvl: 'TVL',
            volume_24h: '24h Volume',
            deposit: 'Deposit',
            withdraw: 'Withdraw',
            history: 'History',
            help: 'Help',
            loading: 'Loading...',
            confirm: 'Confirm',
            cancel: 'Cancel',
            back: 'Back',
            next: 'Next',
            processing: 'Processing...',
            success: 'Success!',
            error: 'Error',
            details: 'View Details',
            portfolio_value: 'Portfolio Value',
            available_balance: 'Available Balance',
            staked_value: 'Staked Value',
            monthly_yield: 'Monthly Yield',
            average_apr: 'Average APR',
            recent_activity: 'Recent Activity',
            view_all: 'View All',
            positions_count: '{{count}} active positions',
            total_balance: 'Total Balance',
            processing_transaction: 'Processing Transaction...',
            search: 'Search',
            filter: 'Filter',
            time_period: {
              all: 'All Time',
              week: 'Past Week',
              month: 'Past Month'
            }
          },
          dashboard: {
            title: 'Dashboard',
            description: 'Track your portfolio performance and market activity',
            portfolio_summary: 'Portfolio Summary',
            performance_history: 'Performance History',
            total_value: 'Total Value',
            available_balance: 'Available Balance',
            total_balance: 'Total Balance',
            recent_activity: 'Recent Activity',
            view_all: 'View All',
            view_all_transactions: 'View all transactions',
            asset_allocation: 'Asset Allocation',
            portfolio_performance: 'Portfolio Performance',
            performance_desc: 'Track your portfolio value and yields over time',
            value: 'Value',
            yield: 'Yield',
            distribution: 'Distribution of your portfolio',
            chart: {
              tooltip: {
                value: 'Value: {{value}}',
                yield: 'Yield: +{{value}}'
              }
            }
          },
          history: {
            title: 'Transaction History',
            description: 'Track your deposits, withdrawals, and position closures',
            all_activity: 'All Activity',
            transaction_type: {
              deposit: 'Deposit',
              withdraw: 'Withdraw',
              position_closed: 'Position Closed'
            },
            total_deposits: 'Total Deposits',
            total_withdrawals: 'Total Withdrawals',
            initial_investment: 'Initial Investment',
            duration: 'Duration',
            profit_loss: 'Profit/Loss',
            no_transactions: 'No transactions found',
            deposits_count: '{{count}} deposits',
            withdrawals_count: '{{count}} withdrawals',
            closed_positions: 'Closed Positions',
            search_placeholder: 'Search by pool name...',
            deposits: 'Deposits',
            withdrawals: 'Withdrawals',
            filter_options: {
              all_time: 'All Time',
              past_week: 'Past Week',
              past_month: 'Past Month'
            },
            transaction_details: {
              initial: 'Initial',
              final: 'Final',
              duration: '{{start}} - {{end}}'
            }
          },
          pools: {
            title: 'Pools',
            description: 'Manage your liquidity positions',
            deposit: {
              title: 'Deposit into',
              amount_label: 'Amount to Deposit',
              estimated_daily: 'Daily Yield',
              estimated_yearly: 'Yearly Yield',
              confirm: 'Confirm Deposit',
              success_message: 'Successfully deposited {{amount}} into {{pool}}',
              error: 'Failed to process deposit',
              steps: {
                token: 'Select Token',
                amount: 'Enter Amount',
                review: 'Review & Confirm'
              }
            },
            withdraw: {
              title: 'Withdraw from',
              amount_label: 'Amount to Withdraw',
              current_value: 'Current Value',
              withdraw_amount: 'Withdrawal Amount',
              estimated_pnl: 'Estimated P&L',
              confirm: 'Confirm Withdrawal',
              success_message: 'Successfully withdrawn {{amount}} from {{pool}} with {{pnl}} P&L',
              error: 'Failed to process withdrawal',
              steps: {
                amount: 'Select Amount',
                review: 'Review & Confirm'
              }
            },
            view_details: 'View Details',
            utilization: 'Utilization',
            pool_health: 'Pool Health',
            health_metrics: 'Overall health and stability of the pool',
            volume_metrics: '24-hour trading volume for this pool',
            risk_levels: {
              low: 'Low Risk',
              medium: 'Medium Risk',
              high: 'High Risk'
            },
            metrics: {
              volume_24h: '24h Volume',
              tvl: 'Total Value Locked',
              apr: 'Annual Rate',
              daily_fees: 'Daily Fees'
            }
          },
          portfolio: {
            title: 'Portfolio',
            description: 'Track your liquidity positions and returns',
            overview: 'Portfolio Overview',
            total_portfolio_value: 'Total Portfolio Value',
            positions_value: 'Positions Value',
            total_balance: 'Total Balance',
            initial_investment: 'Initial Investment',
            current_value: 'Current Value',
            performance: 'Performance',
            performance_history: 'Performance History',
            value: 'Value',
            active_positions: 'Active Positions',
            pool_share: 'Pool Share',
            daily_yield: 'Daily Yield',
            deposit: 'Deposit',
            add_position: 'Add Position'
          }
        }
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
            help: 'Ayuda',
            need_help: '¿Necesitas ayuda?',
            help_tooltip: 'Si necesitas asistencia con conceptos DeFi o el uso de esta plataforma, visita nuestra Base de Conocimientos o contacta con soporte.',
            loading: 'Cargando...',
            confirm: 'Confirmar',
            cancel: 'Cancelar',
            back: 'Atrás',
            next: 'Siguiente',
            positions_count: '{{count}} posiciones activas',
            total_balance: 'Saldo Total',
            processing_transaction: 'Procesando transacción...',
            search: 'Buscar',
            filter: 'Filtrar',
            time_period: {
              all: 'Todo el tiempo',
              week: 'Última semana',
              month: 'Último mes'
            }

          },
          dashboard: {
            title: 'Panel',
            description: 'Visión general del rendimiento de AutoYield',
            portfolio_summary: 'Resumen del Portafolio',
            total_value: 'Valor Total',
            available_balance: 'Saldo Disponible',
            total_balance: 'Saldo Total',
            recent_activity: 'Actividad Reciente',
            view_all: 'Ver Todo',
            notices: {
              title: 'Tablón de Anuncios',
              high_yield_title: 'Oportunidad de Alto Rendimiento',
              high_yield_message: 'El pool SOL-USDC ofrece actualmente un 25.5% APR. Considera aumentar tu posición.',
              market_update_title: 'Actualización de Mercado',
              market_update_message: 'Se espera una volatilidad del mercado mayor de lo habitual esta semana. Monitorea tus posiciones de cerca.',
            },
            performance_history: 'Historial de Rendimiento',
            distribution: 'Distribución de tu portafolio',
            chart: {
              tooltip: {
                value: 'Valor: {{value}}',
                yield: 'Rendimiento: +{{value}}'
              }
            }
          },
          portfolio: {
            title: 'Portafolio',
            description: 'Rastrea tus posiciones de liquidez y rendimientos',
            overview: 'Resumen del Portafolio',
            total_portfolio_value: 'Valor Total del Portafolio',
            available_balance: 'Saldo Disponible',
            positions_value: 'Valor de Posiciones',
            total_balance: 'Saldo Total',
            initial_investment: 'Inversión Inicial',
            current_value: 'Valor Actual',
            performance: 'Rendimiento',
            performance_history: 'Historial de Rendimiento',
            value: 'Valor',
            active_positions: 'Posiciones Activas',
            pool_share: 'Participación en Pool',
            daily_yield: 'Rendimiento Diario',
            ai_strategy: 'Estrategia IA',
            next_move: 'Próximo Movimiento Proyectado',
            monitoring_message: 'Monitoreando el pool {{pool}} para un posible aumento de posición. Las métricas actuales muestran condiciones favorables con {{apr}}% APR.',
            recent_decisions: 'Decisiones Recientes',
            decision_types: {
              enter: 'Entrar',
              exit: 'Salir',
              rebalance: 'Reequilibrar',
            },
            deposit: 'Depositar',
            asset_allocation: 'Asignación de Activos',
            add_position: 'Añadir Posición',
          },
          pools: {
            title: 'Pools de Liquidez',
            description: 'Gestiona tus posiciones de liquidez',
            all_pools: 'Todos los Pools',
            low_risk: 'Riesgo Bajo',
            medium_risk: 'Riesgo Medio',
            high_risk: 'Riesgo Alto',
            sort_by: 'Ordenar por',
            highest_apr: 'TAE más Alta',
            highest_tvl: 'VTB más Alto',
            volume_24h: 'Volumen (24h)',
            risk_level: 'Nivel de Riesgo',
            low: 'Bajo',
            medium: 'Medio',
            high: 'Alto',
            not_found: 'Pool no encontrado',
            details_description: 'Detalles y Rendimiento del Pool',
            token_information: 'Información del Token',
            primary_token: 'Token principal',
            paired_token: 'Token pareado',
            pool_reserve: 'Reserva del Pool',
            current_price: 'Precio actual',
            metrics: 'Métricas del Pool',
            risk_profile: 'Perfil de Riesgo',
            volume_metrics: 'Métricas de Volumen',
            pool_health: 'Salud del Pool',
            utilization: 'Utilización',
            price_ratio: 'Proporción de Precios',
            impermanent_loss: 'Pérdida Impermanente',
            weekly_volume: 'Volumen Semanal',
            weekly_fees: 'Comisiones Semanales',
            annual_rate: 'Tasa porcentual anual',
            trading_volume: 'Comercio de las últimas 24 horas',
            earned_24h: 'Ganado en las últimas 24h',
            total_locked: 'Valor total bloqueado',
            tvl_history: 'Historial de TVL',
            high_il_warning_title: 'Alto Riesgo de Pérdida Impermanente',
            high_il_warning: 'Alto riesgo de pérdida impermanente detectado. Considera tu posición cuidadosamente.',
            deposit: {
              title: 'Depositar en',
              amount_label: 'Cantidad a Depositar',
              estimated_daily: 'Rendimiento Diario',
              estimated_yearly: 'Rendimiento Anual',
              confirm: 'Confirmar Depósito',
              success_message: 'Depósito de {{amount}} en {{pool}} realizado correctamente',
              error: 'Error al procesar el depósito',
              steps: {
                token: 'Seleccionar Token',
                amount: 'Ingresar Cantidad',
                review: 'Revisar y Confirmar'
              }
            },
            withdraw: {
              title: 'Retirar de',
              amount_label: 'Cantidad a Retirar',
              current_value: 'Valor Actual',
              withdraw_amount: 'Cantidad de Retiro',
              estimated_pnl: 'Estimación de Ganancias/Pérdidas',
              confirm: 'Confirmar Retiro',
              success_message: 'Retiro de {{amount}} de {{pool}} realizado correctamente con {{pnl}} de Ganancias/Pérdidas',
              error: 'Error al procesar el retiro',
              steps: {
                amount: 'Seleccionar Cantidad',
                review: 'Revisar y Confirmar'
              }
            },
            metrics: {
              volume_24h: 'Volumen 24h',
              tvl: 'Valor Total Bloqueado',
              apr: 'Tasa Anual',
              daily_fees: 'Comisiones Diarias'
            }
          },
          history: {
            title: 'Historial',
            description: 'Ver tu historial completo de transacciones',
            all_activity: 'Toda la Actividad',
            transaction_type: {
              deposit: 'Depósito',
              withdraw: 'Retiro',
              position_closed: 'Posición Cerrada',
            },
            total_deposits: 'Depósitos Totales',
            total_withdrawals: 'Retiros Totales',
            initial_investment: 'Inversión Inicial',
            duration: 'Duración',
            profit_loss: 'Ganancias/Pérdidas',
            all_time: 'Todo el Tiempo',
            past_week: 'Última Semana',
            past_month: 'Último Mes',
            no_transactions: 'No se encontraron transacciones para los filtros seleccionados.',
            filter_options: {
              all_time: 'Todo el tiempo',
              past_week: 'Última semana',
              past_month: 'Último mes'
            },
            transaction_details: {
              initial: 'Inicial',
              final: 'Final',
              duration: '{{start}} - {{end}}'
            }
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
          defi: {
            terms: {
              apr: 'Tasa Porcentual Anual - La tasa anual de retorno de tu inversión sin interés compuesto.',
              tvl: 'Valor Total Bloqueado - La cantidad total de activos depositados en el pool.',
              pool_share: 'El porcentaje del pool que representa tu depósito.',
              impermanent_loss: 'Pérdida potencial que ocurre cuando el precio de tus activos depositados cambia en comparación con simplemente mantenerlos.',
              pool_activity: 'Qué tan activamente se utiliza el pool para el comercio y la generación de rendimiento, lo que indica el impulso actual del pool.',
              yield_farming: 'Estrategia de staking o préstamo de criptoactivos para generar altos rendimientos en forma de criptomoneda adicional.',
              smart_contract: 'Código autoejecutante en una blockchain que implementa automáticamente los términos de un acuerdo cuando se cumplen condiciones predeterminadas.',
              gas_fee: 'Tarifa de transacción pagada a los validadores de la red por procesar transacciones en una red blockchain.',
              amm: 'Creador de Mercado Automatizado - Un protocolo de intercambio descentralizado que utiliza pools de liquidez para habilitar el comercio automático.',
              protocol_fee: 'Tarifa cobrada por una plataforma DeFi que va al tesoro del protocolo o se distribuye a los poseedores de tokens de gobernanza.',
              utilization_rate: 'El porcentaje de activos disponibles en un pool que actualmente están siendo prestados o utilizados.',
              risk_note: 'Los niveles altos pueden afectar significativamente los rendimientos. Considera tu tolerancia al riesgo.'
            }
          }
        }
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
            help: 'ヘルプ',
            need_help: 'ヘルプが必要ですか？',
            help_tooltip: 'DeFiの概念やこのプラットフォームの使用について支援が必要な場合は、知識ベースにアクセスするかサポートにお問い合わせください。',
            loading: '読み込み中...',
            confirm: '確認',
            cancel: 'キャンセル',
            back: '戻る',
            next: '次へ',
            positions_count: '{{count}}件のアクティブなポジション',
            total_balance: '合計残高',
            processing_transaction: 'トランザクション処理中...',
            search: '検索',
            filter: '絞り込み',
            time_period: {
              all: '全期間',
              week: '過去1週間',
              month: '過去1ヶ月'
            }
          },
          dashboard: {
            title: 'ダッシュボード',
            description: 'AutoYieldのパフォーマンス概要',
            portfolio_summary: 'ポートフォリオ概要',
            total_value: '総額',
            available_balance: '利用可能残高',
            total_balance: '合計残高',
            recent_activity: '最近のアクティビティ',
            view_all: 'すべて表示',
            notices: {
              title: '通知ボード',
              high_yield_title: '高利回り機会',
              high_yield_message: 'SOL-USDCプールが現在25.5%のAPRを提供中。ポジション増加をご検討ください。',
              market_update_title: '市場アップデート',
              market_update_message: '今週は通常より高い市場変動性が予想されます。ポジションを注意深く監視してください。',
            },
            performance_history: 'パフォーマンス履歴',
            distribution: 'ポートフォリオの配分',
            chart: {
              tooltip: {
                value: '価値: {{value}}',
                yield: '利回り: +{{value}}'
              }
            }
          },
          portfolio: {
            title: 'ポートフォリオ',
            description: '流動性ポジションとリターンを追跡',
            overview: 'ポートフォリオ概要',
            total_portfolio_value: 'ポートフォリオ総額',
            available_balance: '利用可能残高',
            positions_value: 'ポジション価値',
            total_balance: '合計残高',
            initial_investment: '初期投資',
            current_value: '現在価値',
            performance: 'パフォーマンス',
            performance_history: 'パフォーマンス履歴',
            value: '価値',
            active_positions: 'アクティブポジション',
            pool_share: 'プールシェア',
            daily_yield: '日次利回り',
            ai_strategy: 'AI戦略',
            next_move: '次の予測される動き',
            monitoring_message: '{{pool}}プールのポジション増加の可能性を監視中。現在の指標は{{apr}}% APRで好条件を示しています。',
            recent_decisions: '最近の決定',
            decision_types: {
              enter: '参入',
              exit: '退出',
              rebalance: 'リバランス',
            },
            deposit: '預入',
            asset_allocation: '資産配分',
            add_position: 'ポジション追加',
          },
          pools: {
            title: '流動性プール',
            description: '流動性ポジションを管理',
            all_pools: 'すべてのプール',
            low_risk: '低リスク',
            medium_risk: '中リスク',
            high_risk: '高リスク',
            sort_by: '並び替え',
            highest_apr: '最高APR',
            highest_tvl: '最高TVL',
            volume_24h: '取引量（24時間）',
            risk_level: 'リスクレベル',
            low: '低',
            medium: '中',
            high: '高',
            not_found: 'プールが見つかりません',
            details_description: 'プール詳細とパフォーマンス',
            token_information: 'トークン情報',
            primary_token: '主要トークン',
            paired_token: 'ペアトークン',
            pool_reserve: 'プールの準備金',
            current_price: '現在の価格',
            metrics: 'プールの指標',
            risk_profile: 'リスクプロファイル',
            volume_metrics: '出来高指標',
            pool_health: 'プールの状況',
            utilization: '利用率',
            price_ratio: '価格比率',
            impermanent_loss: '非永続的損失',
            weekly_volume: '週間取引量',
            weekly_fees: '週間手数料',
            annual_rate: '年間利率',
            trading_volume: '過去24時間の取引',
            earned_24h: '過去24時間の収益',
            total_locked: 'ロックされた総額',
            tvl_history: 'TVL履歴',
            high_il_warning_title: '高い非永続的損失リスク',
            high_il_warning: '高い非永続的損失リスクが検出されました。慎重にポジションを検討してください。',
            deposit: {
              title: '預入',
              amount_label: '預入額',
              estimated_daily: '日次利回り',
              estimated_yearly: '年間利回り',
              confirm: '預入確認',
              success_message: '{{pool}}に{{amount}}を正常に預け入れました',
              error: '預け入れ処理に失敗しました',
              steps: {
                token: 'トークンの選択',
                amount: '数量を入力',
                review: '確認と承認'
              }
            },
            withdraw: {
              title: '引出',
              amount_label: '引出額',
              current_value: '現在価値',
              withdraw_amount: '引出額',
              estimated_pnl: '損益見込み',
              confirm: '引出確認',
              success_message: '{{pnl}}の損益で{{pool}}から{{amount}}を正常に引き出しました',
              error: '引き出し処理に失敗しました',
              steps: {
                amount: '数量の選択',
                review: '確認と承認'
              }
            },
            metrics: {
              volume_24h: '24時間取引量',
              tvl: 'ロック済み総額',
              apr: '年間利率',
              daily_fees: '日次手数料'
            }
          },
          history: {
            title: '履歴',
            description: '取引履歴の完全な記録を表示',
            all_activity: '全アクティビティ',
            transaction_type: {
              deposit: '預入',
              withdraw: '引出',
              position_closed: 'ポジション終了',
            },
            total_deposits: '総預入額',
            total_withdrawals: '総引出額',
            initial_investment: '初期投資',
            duration: '期間',
            profit_loss: '損益',
            all_time: '全期間',
            past_week: '過去1週間',
            past_month: '過去1ヶ月',
            no_transactions: '選択されたフィルタに対する取引が見つかりません。',
            filter_options: {
              all_time: '全期間',
              past_week: '過去1週間',
              past_month: '過去1ヶ月'
            },
            transaction_details: {
              initial: '開始時',
              final: '終了時',
              duration: '{{start}} - {{end}}'
            }
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
          defi: {
            terms: {
              apr: '年率 - 複利なしでの投資の年間収益率。',
              tvl: 'ロック済み総額 - プールに預けられた資産の総額。',
              pool_share: 'あなたの預金がプール全体に占める割合。',
              impermanent_loss: '資産を単に保有する場合と比較して、預けた資産の価格が変動した際に発生する可能性のある損失。',
              pool_activity: 'プールが取引や収益生成にどの程度積極的に使用されているか、プールの現在の勢いを示す指標。',
              yield_farming: '追加の暗号通貨の形で高いリターンを生み出すために暗号資産をステーキングまたは貸し出す戦略。',
              smart_contract: '特定の条件が満たされた時に契約条件を自動的に実行するブロックチェーン上の自己実行コード。',
              gas_fee: 'ブロックチェーンネットワークでトランザクションを処理するためにネットワーク検証者に支払われる手数料。',
              amm: '自動マーケットメーカー - 自動取引を可能にするために流動性プールを使用する分散型取引プロトコル。',
              protocol_fee: 'DeFiプラットフォームによって請求され、プロトコルの財務や統治トークン保有者に分配される手数料。',
              utilization_rate: 'プール内で現在貸し出されているか使用されている利用可能な資産の割合。',
              risk_note: '高いレベルはリターンに大きな影響を与える可能性があります。あなたのリスク許容度を考慮してください。'
            }
          }
        }
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
            help: 'Yardım',
            need_help: 'Yardıma mı ihtiyacınız var?',
            help_tooltip: 'DeFi kavramları veya bu platformun kullanımı hakkında yardıma ihtiyacınız varsa, Bilgi Tabanımızı ziyaret edin veya destek ile iletişime geçin.',
            loading: 'Yükleniyor...',
            confirm: 'Onayla',
            cancel: 'İptal',
            back: 'Geri',
            next: 'İleri',
            positions_count: '{{count}} aktif pozisyon',
            total_balance: 'Toplam Bakiye',
            processing_transaction: 'İşlem işleniyor...',
            search: 'Ara',
            filter: 'Filtrele',
            time_period: {
              all: 'Tüm Zamanlar',
              week: 'Geçen Hafta',
              month: 'Geçen Ay'
            }
          },
          dashboard: {
            title: 'Panel',
            description: 'AutoYield performansınıza genel bakış',
            portfolio_summary: 'Portföy Özeti',
            total_value: 'Toplam Değer',
            available_balance: 'Kullanılabilir Bakiye',
            total_balance: 'Toplam Bakiye',
            recent_activity: 'Son Aktivite',
            view_all: 'Tümünü Görüntüle',
            notices: {
              title: 'Duyuru Panosu',
              high_yield_title: 'Yüksek Getiri Fırsatı',
              high_yield_message: 'SOL-USDC havuzu şu anda %25,5 APR sunuyor. Pozisyonunuzu artırmayı düşünün.',
              market_update_title: 'Piyasa Güncellemesi',
              market_update_message: 'Bu hafta normalden daha yüksek piyasa oynaklığı bekleniyor. Pozisyonlarınızı yakından izleyin.',
            },
            performance_history: 'Performans Geçmişi',
            distribution: 'Portföyünüzün dağılımı',
            chart: {
              tooltip: {
                value: 'Değer: {{value}}',
                yield: 'Getiri: +{{value}}'
              }
            }
          },
          portfolio: {
            title: 'Portföy',
            description: 'Likidite pozisyonlarınızı ve getirilerinizi takip edin',
            overview: 'Portföy Genel Bakışı',
            total_portfolio_value: 'Toplam Portföy Değeri',
            available_balance: 'Kullanılabilir Bakiye',
            positions_value: 'Pozisyon Değeri',
            total_balance: 'Toplam Bakiye',
            initial_investment: 'İlk Yatırım',
            current_value: 'Güncel Değer',
            performance: 'Performans',
            performance_history: 'Performans Geçmişi',
            value: 'Değer',
            active_positions: 'Aktif Pozisyonlar',
            pool_share: 'Havuz Payı',
            daily_yield: 'Günlük Getiri',
            ai_strategy: 'AI Stratejisi',
            next_move: 'Sonraki Öngörülen Hamle',
            monitoring_message: '{{pool}} havuzunda pozisyon artışı için izleme yapılıyor. Mevcut metrikler %{{apr}} APR ile uygun koşulları gösteriyor.',
            recent_decisions: 'Son Kararlar',
            decision_types: {
              enter: 'Giriş',
              exit: 'Çıkış',
              rebalance: 'Yeniden Dengeleme',
            },
            deposit: 'Yatır',
            asset_allocation: 'Varlık Dağılımı',
            add_position: 'Pozisyon Ekle',
          },
          pools: {
            title: 'Likidite Havuzları',
            description: 'Likidite pozisyonlarınızı yönetin',
            all_pools: 'Tüm Havuzlar',
            low_risk: 'Düşük Risk',
            medium_risk: 'Orta Risk',
            high_risk: 'Yüksek Risk',
            sort_by: 'Sıralama Kriteri',
            highest_apr: 'En Yüksek APR',
            highest_tvl: 'En Yüksek TVL',
            volume_24h: 'Hacim (24s)',
            risk_level: 'Risk Seviyesi',
            low: 'Düşük',
            medium: 'Orta',
            high: 'Yüksek',
            not_found: 'Havuz bulunamadı',
            details_description: 'Havuz Detayları ve Performansı',
            token_information: 'Token Bilgileri',
            primary_token: 'Birincil Token',
            paired_token: 'Eşleştirilmiş Token',
            pool_reserve: 'Havuz Rezervi',
            current_price: 'Güncel Fiyat',
            metrics: 'Havuz Metrikleri',
            risk_profile: 'Risk Profili',
            volume_metrics: 'Hacim Metrikleri',
            pool_health: 'Havuz Sağlığı',
            utilization: 'Kullanım Oranı',
            price_ratio: 'Fiyat Oranı',
            impermanent_loss: 'Geçici Kayıp',
            weekly_volume: 'Haftalık Hacim',
            weekly_fees: 'Haftalık Komisyonlar',
            annual_rate: 'Yıllık yüzdesel oran',
            trading_volume: 'Son 24 saatlik işlem hacmi',
            earned_24h: 'Son 24 saatte kazanılan',
            total_locked: 'Toplam kilitli değer',
            tvl_history: 'TVL Geçmişi',
            high_il_warning_title: 'Yüksek Geçici Kayıp Riski',
            high_il_warning: 'Yüksek geçici kayıp riski tespit edildi. Pozisyonunuzu dikkatlice değerlendirin.',
            deposit: {
              title: 'Havuza Yatır',
              amount_label: 'Yatırılacak Miktar',
              estimated_daily: 'Günlük Getiri',
              estimated_yearly: 'Yıllık Getiri',
              confirm: 'Yatırımı Onayla',
              success_message: '{{pool}} havuzuna {{amount}} başarıyla yatırıldı',
              error: 'Yatırım işlemi başarısız oldu',
              steps: {
                token: 'Token Seç',
                amount: 'Miktar Gir',
                review: 'İncele ve Onayla'
              }
            },
            withdraw: {
              title: 'Havuzdan Çek',
              amount_label: 'Çekilecek Miktar',
              current_value: 'Güncel Değer',
              withdraw_amount: 'Çekim Miktarı',
              estimated_pnl: 'Tahmini Kar/Zarar',
              confirm: 'Çekimi Onayla',
              success_message: '{{pool}} havuzundan {{amount}} {{pnl}} Kar/Zarar ile başarıyla çekildi',
              error: 'Çekim işlemi başarısız oldu',
              steps: {
                amount: 'Miktar Seç',
                review: 'İncele ve Onayla'
              }
            },
            metrics: {
              volume_24h: '24s Hacim',
              tvl: 'Kilitli Toplam Değer',
              apr: 'Yıllık Oran',
              daily_fees: 'Günlük Ücretler'
            }
          },
          history: {
            title: 'Geçmiş',
            description: 'Eksiksiz işlem geçmişinizi görüntüleyin',
            all_activity: 'Tüm Aktiviteler',
            transaction_type: {
              deposit: 'Yatırım',
              withdraw: 'Çekim',
              position_closed: 'Pozisyon Kapatıldı',
            },
            total_deposits: 'Toplam Yatırımlar',
            total_withdrawals: 'Toplam Çekimler',
            initial_investment: 'İlk Yatırım',
            duration: 'Süre',
            profit_loss: 'Kar/Zarar',
            all_time: 'Tüm Zamanlar',
            past_week: 'Geçen Hafta',
            past_month: 'Geçen Ay',
            no_transactions: 'Seçilen filtreler için işlem bulunamadı.',
            filter_options: {
              all_time: 'Tüm Zamanlar',
              past_week: 'Geçen Hafta',
              past_month: 'Geçen Ay'
            },
            transaction_details: {
              initial: 'Başlangıç',
              final: 'Bitiş',
              duration: '{{start}} - {{end}}'
            }
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
          defi: {
            terms: {
              apr: 'Yıllık Yüzdesel Oranı - Bileşik faiz olmadan yatırımınızdan elde edilen yıllık getiri oranı.',
              tvl: 'Kilitli Toplam Değer - Havuza yatırılan toplam varlık miktarı.',
              pool_share: 'Havuzda yatırımınızın temsil ettiği yüzde.',
              impermanent_loss: 'Yatırdığınız varlıkların fiyatı, onları sadece tutmaya kıyasla değiştiğinde oluşan potansiyel kayıp.',
              pool_activity: 'Havuzun ticaret ve getiri üretimi için ne kadar aktif olarak kullanıldığı, havuzun mevcut momentumunu gösterir.',
              yield_farming: 'Ek kripto para birimi şeklinde yüksek getiri elde etmek için kripto varlıkları stake etme veya ödünç verme stratejisi.',
              smart_contract: 'Önceden belirlenmiş koşullar karşılandığında bir anlaşmanın şartlarını otomatik olarak uygulayan bir blokzincir üzerindeki kendi kendini yürüten kod.',
              gas_fee: 'Bir blok zinciri ağında işlemleri işlemek için ağ doğrulayıcılarına ödenen işlem ücreti.',
              amm: 'Otomatik Piyasa Yapıcı - Otomatik ticareti mümkün kılmak için likidite havuzlarını kullanan merkezi olmayan bir borsa protokolü.',
              protocol_fee: 'DeFi platformu tarafından alınan ve protokol hazinesine giden veya yönetişim token sahiplerine dağıtılan ücret.',
              utilization_rate: 'Bir havuzdaki mevcut varlıkların şu anda ödünç verilen veya kullanılan yüzdesi.',
              risk_note: 'Yüksek seviyeler getirileri önemli ölçüde etkileyebilir. Risk toleransınızı göz önünde bulundurun.'
            }
          }
        }
      },
    },
  });

export default i18n;