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
          actions: {
            deposit: 'Deposit',
            withdraw: 'Withdraw',
            connect_wallet: 'Connect Wallet',
            disconnect: 'Disconnect',
            confirm: 'Confirm',
            cancel: 'Cancel',
            back: 'Back',
            next: 'Next',
            view_all: 'View All',
            search: 'Search',
            filter: 'Filter'
          },
          nav: {
            dashboard: 'Dashboard',
            pools: 'Pools',
            portfolio: 'Portfolio',
            history: 'History',
            help: 'Help'
          },
          stats: {
            total_value: 'Total Value',
            available_balance: 'Available Balance',
            total_balance: 'Total Balance',
            total_deposits: 'Total Deposits',
            total_withdrawals: 'Total Withdrawals',
            profit_loss: 'Profit/Loss',
            monthly_yield: 'Monthly Yield',
            average_apr: 'Average APR: {{value}}%',
            active_positions: '{{count}} active positions',
            deposits_count: '{{count}} deposits',
            withdrawals_count: '{{count}} withdrawals',
            positions_closed: '{{count}} positions closed',
            tvl: 'TVL',
            volume_24h: '24h Volume',
            apr: 'APR',
            pnl: 'P&L',
            total_pnl: 'Total P&L'

          },
          dashboard: {
            title: 'Dashboard',
            description: 'Track your portfolio performance and market activity',
            portfolio_performance: 'Portfolio Performance',
            performance_description: 'Track your portfolio value and yields over time',
            asset_allocation: 'Asset Allocation',
            distribution: 'Distribution of your portfolio',
            recent_activity: 'Recent Activity',
            chart: {
              value: 'Value',
              yield: 'Yield',
              value_tooltip: 'Value: {{value}}',
              yield_tooltip: 'Yield: +{{value}}'
            },
            portfolio_summary: 'Portfolio Summary'
          },
          history: {
            title: 'Transaction History',
            description: 'Track your deposits, withdrawals, and position closures',
            all_activity: 'All Activity',
            no_transactions: 'No transactions found',
            try_filtering: 'Try adjusting your filters or search criteria',
            search_placeholder: 'Search by pool name...',
            transaction_types: {
              deposit: 'Deposit',
              withdraw: 'Withdraw',
              position_closed: 'Position Closed'
            },
            filters: {
              all_time: 'All Time',
              past_week: 'Past Week',
              past_month: 'Past Month'
            },
            details: {
              initial: 'Initial',
              final: 'Final',
              duration: '{{start}} - {{end}}'
            },
            initial_investment: 'Initial Investment',
            duration: 'Duration'
          },
          time: {
            daily: 'Daily',
            weekly: 'Weekly',
            monthly: 'Monthly',
            yearly: 'Yearly',
            all: 'All Time',
            week: 'Past Week',
            month: 'Past Month'

          },
          status: {
            loading: 'Loading...',
            processing: 'Processing...',
            success: 'Success!',
            error: 'Error occurred',
            processing_transaction: 'Processing Transaction...'
          },
          pools: {
            title: 'Pools',
            description: 'Manage your liquidity positions',
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
            },
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
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}'
          },
          defi: {
            terms: {
              apr: 'Annual Percentage Rate - The annual rate of return on your investment without compound interest.',
              tvl: 'Total Value Locked - The total amount of assets deposited in the pool.',
              pool_share: 'The percentage of the pool that your deposit represents.',
              impermanent_loss: 'Potential loss that occurs when the price of your deposited assets changes compared to simply holding them.',
              pool_activity: 'How actively the pool is used for trading and yield generation, indicating the current momentum of the pool.',
              yield_farming: 'Strategy of staking or lending crypto assets to generate high returns in the form of additional cryptocurrency.',
              smart_contract: 'Self-executing code on a blockchain that automatically implements the terms of an agreement when predetermined conditions are met.',
              gas_fee: 'Transaction fee paid to network validators for processing transactions on a blockchain network.',
              amm: 'Automated Market Maker - A decentralized exchange protocol that uses liquidity pools to enable automated trading.',
              protocol_fee: 'Fee charged by a DeFi platform that goes to the protocol treasury or is distributed to governance token holders.',
              utilization_rate: 'The percentage of available assets in a pool that are currently being lent or used.',
              risk_note: 'High levels can significantly impact returns. Consider your risk tolerance.'
            }
          }
        }
      },
      es: {
        translation: {
          actions: {
            deposit: 'Depositar',
            withdraw: 'Retirar',
            connect_wallet: 'Conectar Billetera',
            disconnect: 'Desconectar',
            confirm: 'Confirmar',
            cancel: 'Cancelar',
            back: 'Atrás',
            next: 'Siguiente',
            view_all: 'Ver Todo',
            search: 'Buscar',
            filter: 'Filtrar'
          },
          nav: {
            dashboard: 'Panel',
            pools: 'Pools',
            portfolio: 'Portafolio',
            history: 'Historial',
            help: 'Ayuda'
          },
          stats: {
            total_value: 'Valor Total',
            available_balance: 'Saldo Disponible',
            total_balance: 'Saldo Total',
            total_deposits: 'Depósitos Totales',
            total_withdrawals: 'Retiros Totales',
            profit_loss: 'Ganancias/Pérdidas',
            monthly_yield: 'Rendimiento Mensual',
            average_apr: 'APR Promedio: {{value}}%',
            active_positions: '{{count}} posiciones activas',
            deposits_count: '{{count}} depósitos',
            withdrawals_count: '{{count}} retiros',
            positions_closed: '{{count}} posiciones cerradas',
            tvl: 'VTB',
            volume_24h: 'Volumen 24h',
            apr: 'TAE',
            pnl: 'Ganancias y Pérdidas',
            total_pnl: 'Ganancias y Pérdidas Totales'
          },
          dashboard: {
            title: 'Panel',
            description: 'Visión general del rendimiento de AutoYield',
            portfolio_performance: 'Rendimiento del Portafolio',
            performance_description: 'Rastrea el valor de tu portafolio y los rendimientos a lo largo del tiempo',
            asset_allocation: 'Asignación de Activos',
            distribution: 'Distribución de tu portafolio',
            recent_activity: 'Actividad Reciente',
            chart: {
              value: 'Valor',
              yield: 'Rendimiento',
              value_tooltip: 'Valor: {{value}}',
              yield_tooltip: 'Rendimiento: +{{value}}'
            },
            portfolio_summary: 'Resumen del Portafolio',
            notices: {
              title: 'Tablón de Anuncios',
              high_yield_title: 'Oportunidad de Alto Rendimiento',
              high_yield_message: 'El pool SOL-USDC ofrece actualmente un 25.5% APR. Considera aumentar tu posición.',
              market_update_title: 'Actualización de Mercado',
              market_update_message: 'Se espera una volatilidad del mercado mayor de lo habitual esta semana. Monitorea tus posiciones de cerca.'
            }
          },
          history: {
            title: 'Historial de Transacciones',
            description: 'Rastrea tus depósitos, retiros y cierres de posiciones',
            all_activity: 'Toda la Actividad',
            no_transactions: 'No se encontraron transacciones',
            try_filtering: 'Intenta ajustar tus filtros o criterios de búsqueda',
            search_placeholder: 'Buscar por nombre del pool...',
            transaction_types: {
              deposit: 'Depósito',
              withdraw: 'Retiro',
              position_closed: 'Posición Cerrada'
            },
            filters: {
              all_time: 'Todo el tiempo',
              past_week: 'Última semana',
              past_month: 'Último mes'
            },
            details: {
              initial: 'Inicial',
              final: 'Final',
              duration: '{{start}} - {{end}}'
            },
            initial_investment: 'Inversión Inicial',
            duration: 'Duración'

          },
          time: {
            daily: 'Diario',
            weekly: 'Semanal',
            monthly: 'Mensual',
            yearly: 'Anual',
            all: 'Todo el tiempo',
            week: 'Última semana',
            month: 'Último mes'
          },
          status: {
            loading: 'Cargando...',
            processing: 'Procesando...',
            success: '¡Éxito!',
            error: 'Error',
            processing_transaction: 'Procesando transacción...'
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
              rebalance: 'Reequilibrar'
            },
            deposit: 'Depositar',
            asset_allocation: 'Asignación de Activos',
            add_position: 'Añadir Posición'
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}'
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
          actions: {
            deposit: '預入',
            withdraw: '引出',
            connect_wallet: 'ウォレットを接続',
            disconnect: '切断',
            confirm: '確認',
            cancel: 'キャンセル',
            back: '戻る',
            next: '次へ',
            view_all: 'すべて表示',
            search: '検索',
            filter: '絞り込み'
          },
          nav: {
            dashboard: 'ダッシュボード',
            pools: 'プール',
            portfolio: 'ポートフォリオ',
            history: '履歴',
            help: 'ヘルプ'
          },
          stats: {
            total_value: '総額',
            available_balance: '利用可能残高',
            total_balance: '合計残高',
            total_deposits: '総預入額',
            total_withdrawals: '総引出額',
            profit_loss: '損益',
            monthly_yield: '月次利回り',
            average_apr: '平均APR: {{value}}%',
            active_positions: '{{count}}件のアクティブなポジション',
            deposits_count: '{{count}}件の預入',
            withdrawals_count: '{{count}}件の引出',
            positions_closed: '{{count}}件のポジション終了',
            tvl: 'ロック済み総額',
            volume_24h: '24時間取引量',
            apr: '年利率',
            pnl: '損益',
            total_pnl: '損益合計'
          },
          dashboard: {
            title: 'ダッシュボード',
            description: 'AutoYieldのパフォーマンス概要',
            portfolio_performance: 'ポートフォリオパフォーマンス',
            performance_description: 'ポートフォリオの価値と経年収益率を追跡',
            asset_allocation: '資産配分',
            distribution: 'ポートフォリオの配分',
            recent_activity: '最近のアクティビティ',
            chart: {
              value: '価値',
              yield: '利回り',
              value_tooltip: '価値: {{value}}',
              yield_tooltip: '利回り: +{{value}}'
            },
            portfolio_summary: 'ポートフォリオ概要',
            notices: {
              title: '通知ボード',
              high_yield_title: '高利回り機会',
              high_yield_message: 'SOL-USDCプールが現在25.5%のAPRを提供中。ポジション増加をご検討ください。',
              market_update_title: '市場アップデート',
              market_update_message: '今週は通常より高い市場変動性が予想されます。ポジションを注意深く監視してください。'
            }
          },
          history: {
            title: '取引履歴',
            description: '預入、引出、ポジション終了を追跡',
            all_activity: '全アクティビティ',
            no_transactions: '取引が見つかりません',
            try_filtering: 'フィルタまたは検索条件を調整してみてください。',
            search_placeholder: 'プール名で検索...',
            transaction_types: {
              deposit: '預入',
              withdraw: '引出',
              position_closed: 'ポジション終了'
            },
            filters: {
              all_time: '全期間',
              past_week: '過去1週間',
              past_month: '過去1ヶ月'
            },
            details: {
              initial: '開始時',
              final: '終了時',
              duration: '{{start}} - {{end}}'
            },
            initial_investment: '初期投資',
            duration: '期間'
          },
          time: {
            daily: '日次',
            weekly: '週間',
            monthly: '月次',
            yearly: '年間',
            all: '全期間',
            week: '過去1週間',
            month: '過去1ヶ月'
          },
          status: {
            loading: '読み込み中...',
            processing: '処理中...',
            success: '成功しました！',
            error: 'エラーが発生しました',
            processing_transaction: 'トランザクション処理中...'
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
              rebalance: 'リバランス'
            },
            deposit: '預入',
            asset_allocation: '資産配分',
            add_position: 'ポジション追加'
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}'
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
          actions: {
            deposit: 'Yatır',
            withdraw: 'Çek',
            connect_wallet: 'Cüzdan Bağla',
            disconnect: 'Bağlantıyı Kes',
            confirm: 'Onayla',
            cancel: 'İptal',
            back: 'Geri',
            next: 'İleri',
            view_all: 'Tümünü Görüntüle',
            search: 'Ara',
            filter: 'Filtrele'
          },
          nav: {
            dashboard: 'Panel',
            pools: 'Havuzlar',
            portfolio: 'Portföy',
            history: 'Geçmiş',
            help: 'Yardım'
          },
          stats: {
            total_value: 'Toplam Değer',
            available_balance: 'Kullanılabilir Bakiye',
            total_balance: 'Toplam Bakiye',
            total_deposits: 'Toplam Yatırımlar',
            total_withdrawals: 'Toplam Çekimler',
            profit_loss: 'Kar/Zarar',
            monthly_yield: 'Aylık Getiri',
            average_apr: 'Ortalama APR: {{value}}%',
            active_positions: '{{count}} aktif pozisyon',
            deposits_count: '{{count}} yatırım',
            withdrawals_count: '{{count}} çekim',
            positions_closed: '{{count}} pozisyon kapatıldı',
            tvl: 'Kilitli Toplam Değer',
            volume_24h: '24s Hacim',
            apr: 'Yıllık Getiri',
            pnl: 'Kar/Zarar',
            total_pnl: 'Toplam Kar/Zarar'
          },
          dashboard: {
            title: 'Panel',
            description: 'AutoYield performansınıza genel bakış',
            portfolio_performance: 'Portföy Performansı',
            performance_description: 'Portföy değeriniz ve zaman içindeki getirilerinizi takip edin',
            asset_allocation: 'Varlık Dağılımı',
            distribution: 'Portföyünüzün dağılımı',
            recent_activity: 'Son Aktivite',
            chart: {
              value: 'Değer',
              yield: 'Getiri',
              value_tooltip: 'Değer: {{value}}',
              yield_tooltip: 'Getiri: +{{value}}'
            },
            portfolio_summary: 'Portföy Özeti',
            notices: {
              title: 'Duyuru Panosu',
              high_yield_title: 'Yüksek Getiri Fırsatı',
              high_yield_message: 'SOL-USDC havuzu şu anda %25,5 APR sunuyor. Pozisyonunuzu artırmayı düşünün.',
              market_update_title: 'Piyasa Güncellemesi',
              market_update_message: 'Bu hafta normalden daha yüksek piyasa oynaklığı bekleniyor. Pozisyonlarınızı yakından izleyin.'
            }
          },
          history: {
            title: 'İşlem Geçmişi',
            description: 'Yatırımlarınızı, çekimlerinizi ve pozisyon kapatmalarınızı takip edin',
            all_activity: 'Tüm Aktiviteler',
            no_transactions: 'İşlem bulunamadı',
            try_filtering: 'Filtrelerinizi veya arama kriterlerinizi ayarlamayı deneyin',
            search_placeholder: 'Havuz adına göre ara...',
            transaction_types: {
              deposit: 'Yatırım',
              withdraw: 'Çekim',
              position_closed: 'Pozisyon Kapatıldı'
            },
            filters: {
              all_time: 'Tüm Zamanlar',
              past_week: 'Geçen Hafta',
              past_month: 'Geçen Ay'
            },
            details: {
              initial: 'Başlangıç',
              final: 'Bitiş',
              duration: '{{start}} - {{end}}'
            },
            initial_investment: 'İlk Yatırım',
            duration: 'Süre'
          },
          time: {
            daily: 'Günlük',
            weekly: 'Haftalık',
            monthly: 'Aylık',
            yearly: 'Yıllık',
            all: 'Tüm Zamanlar',
            week: 'Geçen Hafta',
            month: 'Geçen Ay'
          },
          status: {
            loading: 'Yükleniyor...',
            processing: 'İşlem Görülüyor...',
            success: 'Başarılı!',
            error: 'Hata Oluştu',
            processing_transaction: 'İşlem işleniyor...'
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
              rebalance: 'Yeniden Dengeleme'
            },
            deposit: 'Yatır',
            asset_allocation: 'Varlık Dağılımı',
            add_position: 'Pozisyon Ekle'
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}'
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
      }
    }
  });

export default i18n;