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
            total_pnl: 'Total P&L',
            apr: 'APR',
            tvl: 'TVL',
            volume_24h: '24h Volume',
            deposit: 'Deposit',
            withdraw: 'Withdraw',
            history: 'History',
            help: 'Help',
            need_help: 'Need help?',
            help_tooltip: 'If you need assistance with DeFi concepts or using this platform, visit our Knowledge Base or contact support.'
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
            high_il_warning_short: 'Higher impermanent loss risk',
            analytics: {
              volume_trend: 'Volume Trend',
              performance: 'Performance Metrics',
              risk_metrics: 'Risk Analysis',
              price_impact: 'Price Impact',
            },
            not_found: 'Pool not found',
            details_description: 'Pool Details and Performance',
            high_il_warning_title: 'High Impermanent Loss Risk',
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
            new_to_defi: 'New to DeFi pools?',
            defi_explanation: 'Liquidity pools allow you to deposit tokens and earn yield from trading fees and rewards.',
            look_for: 'Look for pools with',
            higher_apr: 'higher APR',
            for_better_returns: 'for better returns or',
            higher_utilization: 'higher utilization',
            for_active_pools: 'for more active pools. We recommend starting with low-risk pools.',
            all_pools: 'All Pools',
            low_risk: 'Low Risk',
            medium_risk: 'Medium Risk',
            high_risk: 'High Risk',
            sort_by: 'Sort by',
            highest_apr: 'Highest APR',
            highest_tvl: 'Highest TVL',
            volume_24h: 'Volume (24h)',
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
              yearly_impact: 'This investment could generate {{yield}} annually - enough for about {{coffees}} coffees!',
              deposit_summary: 'Deposit Summary',
              total_value: 'Total Value',
              warning: 'Please review the details carefully. Once confirmed, this action cannot be undone.',
              current_price: 'Current price',
              risk_note: 'Impermanent Loss Risk',
              risk_explanation: 'This pool has a {{percentage}}% risk of impermanent loss which could affect your returns if market conditions change drastically.',
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
            asset_allocation: 'Asset Allocation',
            add_position: 'Add Position',
            initial: 'Initial',
            value: 'Value',
            profit_loss: 'P&L',
            initial_investment: 'Initial Investment',
            performance_analysis: 'Performance Analysis',
            performance_by_time: 'Performance by Time Period',
            return: 'Return',
            all_time: 'All Time',
            best_performing: 'Best Performing Positions',
            coming_soon: 'Coming Soon',
            protocol_rewards: 'Protocol token rewards and liquidity incentives will be available in the next update.',
            available_balance: 'Available Balance',
            total_balance: 'Total Balance',
            ai_strategy: 'AI Strategy Overview',
            next_move: 'Next Projected Move',
            recent_decisions: 'Recent Decisions',
            decision_types: {
              enter: 'Enter',
              exit: 'Exit',
              rebalance: 'Rebalance'
            },
            monitoring_message: 'Monitoring {{pool}} pool for potential position increase. Current metrics show favorable conditions with {{apr}}% APR.',
            deposit: 'Deposit',
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
            all_activity: 'All Activity',
            closed_positions: 'Closed Positions',
            all_time: 'All Time',
            past_week: 'Past Week',
            past_month: 'Past Month',
            total_deposits: 'Total Deposits',
            total_withdrawals: 'Total Withdrawals',
            no_transactions: 'No transactions found for the selected filters.',
            rewards: 'Rewards & Incentives'
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
            market_overview: 'Market Overview',
            more_details: 'More details',
            top_performing_assets: 'Top Performing Assets',
            view_all_transactions: 'View all transactions'
          },
          defi: {
            terms: {
              apr: 'Annual Percentage Rate - The yearly rate of return on your investment without compounding.',
              tvl: 'Total Value Locked - The total amount of assets deposited in the pool.',
              pool_share: 'The percentage of the pool that your deposit represents.',
              impermanent_loss: 'Potential loss that occurs when the price of your deposited assets changes compared to simply holding them.',
              pool_activity: 'How actively the pool is being used for trading and yield generation, indicating the pool\'s current momentum.',
              yield_farming: 'Strategy of staking or lending crypto assets to generate high returns in the form of additional cryptocurrency.',
              smart_contract: 'Self-executing code on a blockchain that automatically implements the terms of an agreement when predetermined conditions are met.',
              gas_fee: 'Transaction fee paid to network validators for processing transactions on a blockchain network.',
              amm: 'Automated Market Maker - A decentralized exchange protocol that uses liquidity pools to enable automatic trading.',
              protocol_fee: 'Fee charged by a DeFi platform that goes to the protocol treasury or is distributed to governance token holders.',
              utilization_rate: 'The percentage of available assets in a pool that are currently being lent out or used.',
              risk_note: 'High levels can significantly impact returns. Consider your risk tolerance.'
            }
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
            help: 'Ayuda',
            need_help: '¿Necesitas ayuda?',
            help_tooltip: 'Si necesitas asistencia con conceptos DeFi o el uso de esta plataforma, visita nuestra Base de Conocimientos o contacta con soporte.'
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
            high_il_warning_short: 'Mayor riesgo de pérdida impermanente',
            analytics: {
              volume_trend: 'Tendencia de Volumen',
              performance: 'Métricas de Rendimiento',
              risk_metrics: 'Análisis de Riesgo',
              price_impact: 'Impacto en el Precio',
            },
            not_found: 'Pool no encontrado',
            details_description: 'Detalles y Rendimiento del Pool',
            high_il_warning_title: 'Alto Riesgo de Pérdida Impermanente',
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
            new_to_defi: '¿Nuevo en pools DeFi?',
            defi_explanation: 'Los pools de liquidez te permiten depositar tokens y obtener rendimiento de las comisiones comerciales y recompensas.',
            look_for: 'Busca pools con',
            higher_apr: 'mayor TAE',
            for_better_returns: 'para mejores rendimientos o',
            higher_utilization: 'mayor utilización',
            for_active_pools: 'para pools más activos. Recomendamos comenzar con pools de bajo riesgo.',
            all_pools: 'Todos los Pools',
            low_risk: 'Riesgo Bajo',
            medium_risk: 'Riesgo Medio',
            high_risk: 'Riesgo Alto',
            sort_by: 'Ordenar por',
            highest_apr: 'TAE más Alta',
            highest_tvl: 'VTB más Alto',
            volume_24h: 'Volumen (24h)',
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
              yearly_impact: 'Esta inversión podría generar {{yield}} anualmente - ¡suficiente para aproximadamente {{coffees}} cafés!',
              deposit_summary: 'Resumen del Depósito',
              total_value: 'Valor Total',
              warning: 'Por favor, revise los detalles cuidadosamente. Una vez confirmado, esta acción no se puede deshacer.',
              current_price: 'Precio actual',
              risk_note: 'Riesgo de Pérdida Impermanente',
              risk_explanation: 'Este pool tiene un {{percentage}}% de riesgo de pérdida impermanente que podría afectar tus rendimientos si las condiciones del mercado cambian drásticamente.',
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
            asset_allocation: 'Asignación de Activos',
            add_position: 'Añadir Posición',
            initial: 'Inicial',
            value: 'Valor',
            profit_loss: 'Ganancias/Pérdidas',
            initial_investment: 'Inversión Inicial',
            performance_analysis: 'Análisis de Rendimiento',
            performance_by_time: 'Rendimiento por Periodo de Tiempo',
            return: 'Retorno',
            all_time: 'Todo el Tiempo',
            best_performing: 'Posiciones con Mejor Rendimiento',
            coming_soon: 'Próximamente',
            protocol_rewards: 'Las recompensas de tokens de protocolo e incentivos de liquidez estarán disponibles en la próxima actualización.',
            available_balance: 'Saldo Disponible',
            total_balance: 'Saldo Total',
            ai_strategy: 'Resumen de Estrategia IA',
            next_move: 'Próximo Movimiento Proyectado',
            recent_decisions: 'Decisiones Recientes',
            decision_types: {
              enter: 'Entrar',
              exit: 'Salir',
              rebalance: 'Reequilibrar'
            },
            monitoring_message: 'Monitoreando el pool {{pool}} para un posible aumento de posición. Las métricas actuales muestran condiciones favorables con {{apr}}% APR.',
            deposit: 'Depositar',
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
            all_activity: 'Toda la Actividad',
            closed_positions: 'Posiciones Cerradas',
            all_time: 'Todo el Tiempo',
            past_week: 'Última Semana',
            past_month: 'Último Mes',
            total_deposits: 'Depósitos Totales',
            total_withdrawals: 'Retiros Totales',
            no_transactions: 'No se encontraron transacciones para los filtros seleccionados.',
            rewards: 'Recompensas e Incentivos'
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
          dashboard: {
            title: 'Panel',
            description: 'Visión general del rendimiento de AutoYield',
            notices: {
              title: 'Tablón de Anuncios',
              high_yield_title: 'Oportunidad de Alto Rendimiento',
              high_yield_message: 'El pool SOL-USDC ofrece actualmente un 25.5% APR. Considera aumentar tu posición.',
              market_update_title: 'Actualización de Mercado',
              market_update_message: 'Se espera una volatilidad del mercado mayor de lo habitual esta semana. Monitorea tus posiciones de cerca.',
            },
            recent_activity: 'Actividad Reciente',
            portfolio_summary: 'Resumen del Portafolio',
            total_value: 'Valor Total',
            average_apr: 'APR Promedio',
            total_yield: 'Rendimiento Total',
            market_overview: 'Visión del Mercado',
            more_details: 'Más detalles',
            top_performing_assets: 'Activos de Mayor Rendimiento',
            view_all_transactions: 'Ver todas las transacciones'
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
            help: 'ヘルプ',
            need_help: 'ヘルプが必要ですか？',
            help_tooltip: 'DeFiの概念やこのプラットフォームの使用について支援が必要な場合は、知識ベースにアクセスするかサポートにお問い合わせください。'
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
            high_il_warning_short: '高い非永続的損失リスク',
            analytics: {
              volume_trend: '取引量トレンド',
              performance: 'パフォーマンス指標',
              risk_metrics: 'リスク分析',
              price_impact: '価格影響',
            },
            not_found: 'プールが見つかりません',
            details_description: 'プール詳細とパフォーマンス',
            high_il_warning_title: '高い非永続的損失リスク',
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
            new_to_defi: 'DeFiプールが初めてですか？',
            defi_explanation: '流動性プールを使用すると、トークンを預けて取引手数料や報酬から利回りを得ることができます。',
            look_for: '以下のプールを探します',
            higher_apr: 'より高いAPR',
            for_better_returns: 'より良いリターンのため、または',
            higher_utilization: 'より高い利用率',
            for_active_pools: 'よりアクティブなプールのため。低リスクプールから始めることをお勧めします。',
            all_pools: 'すべてのプール',
            low_risk: '低リスク',
            medium_risk: '中リスク',
            high_risk: '高リスク',
            sort_by: '並び替え',
            highest_apr: '最高APR',
            highest_tvl: '最高TVL',
            volume_24h: '取引量（24時間）',
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
              yearly_impact: 'この投資は年間{{yield}}を生み出す可能性があります - 約{{coffees}}杯のコーヒーに相当します！',
              deposit_summary: '預入サマリー',
              total_value: '総額',
              warning: '詳細を注意深く確認してください。確認後、この操作は取り消せません。',
              current_price: '現在の価格',
              risk_note: '非永続的損失リスク',
              risk_explanation: 'このプールは{{percentage}}%の非永続的損失リスクがあり、市場状況が大きく変化した場合にリターンに影響する可能性があります。',
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
            asset_allocation: '資産配分',
            add_position: 'ポジション追加',
            initial: '初期',
            value: '価値',
            profit_loss: '損益',
            initial_investment: '初期投資',
            performance_analysis: 'パフォーマンス分析',
            performance_by_time: '期間別パフォーマンス',
            return: 'リターン',
            all_time: '全期間',
            best_performing: '最高パフォーマンスのポジション',
            coming_soon: '近日公開',
            protocol_rewards: 'プロトコルトークンの報酬と流動性インセンティブは次のアップデートで利用可能になります。',
            available_balance: '利用可能残高',
            total_balance: '合計残高',
            ai_strategy: 'AI戦略概要',
            next_move: '次の予測される動き',
            recent_decisions: '最近の決定',
            decision_types: {
              enter: '参入',
              exit: '退出',
              rebalance: 'リバランス'
            },
            monitoring_message: '{{pool}}プールのポジション増加の可能性を監視中。現在の指標は{{apr}}% APRで好条件を示しています。',
            deposit: '預入',
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
            all_activity: '全アクティビティ',
            closed_positions: '終了したポジション',
            all_time: '全期間',
            past_week: '過去1週間',
            past_month: '過去1ヶ月',
            total_deposits: '総預入額',
            total_withdrawals: '総引出額',
            no_transactions: '選択されたフィルタに対する取引が見つかりません。',
            rewards: '報酬とインセンティブ'
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
            market_overview: '市場概要',
            more_details: '詳細を表示',
            top_performing_assets: '高パフォーマンス資産',
            view_all_transactions: 'すべての取引を表示'
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
            help: 'Yardım',
            need_help: 'Yardıma mı ihtiyacınız var?',
            help_tooltip: 'DeFi kavramları veya bu platformun kullanımı hakkında yardıma ihtiyacınız varsa, Bilgi Tabanımızı ziyaret edin veya destek ile iletişime geçin.'
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
            high_il_warning_short: 'Yüksek geçici kayıp riski',
            analytics: {
              volume_trend: 'Hacim Trendi',
              performance: 'Performans Metrikleri',
              risk_metrics: 'Risk Analizi',
              price_impact: 'Fiyat Etkisi',
            },
            not_found: 'Havuz bulunamadı',
            details_description: 'Havuz Detayları ve Performansı',
            high_il_warning_title: 'Yüksek Geçici Kayıp Riski',
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
            new_to_defi: 'DeFi havuzlarına yeni misiniz?',
            defi_explanation: 'Likidite havuzları, token yatırmanıza ve işlem ücretleri ve ödüllerden getiri elde etmenize olanak tanır.',
            look_for: 'Şunlara sahip havuzları arayın',
            higher_apr: 'daha yüksek APR',
            for_better_returns: 'daha iyi getiriler için veya',
            higher_utilization: 'daha yüksek kullanım',
            for_active_pools: 'daha aktif havuzlar için. Düşük riskli havuzlarla başlamanızı öneririz.',
            all_pools: 'Tüm Havuzlar',
            low_risk: 'Düşük Risk',
            medium_risk: 'Orta Risk',
            high_risk: 'Yüksek Risk',
            sort_by: 'Sıralama Kriteri',
            highest_apr: 'En Yüksek APR',
            highest_tvl: 'En Yüksek TVL',
            volume_24h: 'Hacim (24s)',
            deposit: {
              title: '{{poolName}} Havuzuna Yatır',
              step: '{{total}} Adımından {{current}}. Adım: {{name}}',
              amount_label: 'Miktar (USDC)',
              pool_share: 'Havuz Payı',
              annual_yield: 'Yıllık Getiri (tahmini)',
              token_split: 'Token Dağılımı Önizlemesi',
              expected_returns: 'Beklenen Getiriler',
              estimated_apr: 'Tahmini APR',
              daily_yield: 'Günlük Getiri',
              yearly_yield: 'Yıllık Getiri',
              yearly_impact: 'Bu yatırım yıllık {{yield}} oluşturabilir - yaklaşık {{coffees}} fincan kahve için yeterli!',
              deposit_summary: 'Yatırım Özeti',
              total_value: 'Toplam Değer',
              warning: 'Lütfen detayları dikkatlice inceleyin. Onaylamadan sonra bu işlem geri alınamaz.',
              current_price: 'Güncel fiyat',
              risk_note: 'Geçici Kayıp Riski',
              risk_explanation: 'Bu havuzda, piyasa koşulları büyük ölçüde değişirse getirilerinizi etkileyebilecek %{{percentage}} geçici kayıp riski bulunmaktadır.',
              steps: {
                amount: 'Miktar',
                token_split: 'Token Bölünmesi',
                confirmation: 'Onay'
              },
              back: 'Geri',
              next: 'İleri',
              cancel: 'İptal',
              confirm: 'Yatırımı Onayla',
              processing: 'İşleniyor...',
            },
          },
          portfolio: {
            title: 'Portföy',
            description: 'Likidite pozisyonlarınızı ve getirilerinizi takip edin',
            current_value: 'Güncel Değer',
            value_change_24h: '24s Değişim',
            performance: 'Performans',
            active_positions: 'Aktif Pozisyonlar',
            pool_share: 'Havuz Payı',
            daily_yield: 'Günlük Getiri',
            entry_date: 'Giriş Tarihi',
            asset_allocation: 'Varlık Dağılımı',
            add_position: 'Pozisyon Ekle',
            initial: 'Başlangıç',
            value: 'Değer',
            profit_loss: 'Kar/Zarar',
            initial_investment: 'İlk Yatırım',
            performance_analysis: 'Performans Analizi',
            performance_by_time: 'Zaman Periyoduna Göre Performans',
            return: 'Getiri',
            all_time: 'Tüm Zamanlar',
            best_performing: 'En İyi Performans Gösteren Pozisyonlar',
            coming_soon: 'Yakında',
            protocol_rewards: 'Protokol token ödülleri ve likidite teşvikleri bir sonraki güncellemede mevcut olacaktır.',
            available_balance: 'Kullanılabilir Bakiye',
            total_balance: 'Toplam Bakiye',
            ai_strategy: 'AI Strateji Genel Bakışı',
            next_move: 'Sonraki Öngörülen Hamle',
            recent_decisions: 'Son Kararlar',
            decision_types: {
              enter: 'Giriş',
              exit: 'Çıkış',
              rebalance: 'Yeniden Dengeleme'
            },
            monitoring_message: '{{pool}} havuzunda pozisyon artışı için izleme yapılıyor. Mevcut metrikler %{{apr}} APR ile uygun koşulları gösteriyor.',
            deposit: 'Yatır',
          },
          history: {
            title: 'Geçmiş',
            description: 'Eksiksiz işlem geçmişinizi görüntüleyin',
            activity_log: 'Aktivite Kaydı',
            transaction_type: {
              deposit: 'Yatırım',
              withdraw: 'Çekim',
              position_closed: 'Pozisyon Kapatıldı'
            },
            initial_investment: 'İlk Yatırım',
            duration: 'Süre',
            profit_loss: 'Kar/Zarar',
            all_activity: 'Tüm Aktiviteler',
            closed_positions: 'Kapatılan Pozisyonlar',
            all_time: 'Tüm Zamanlar',
            past_week: 'Geçen Hafta',
            past_month: 'Geçen Ay',
            total_deposits: 'Toplam Yatırımlar',
            total_withdrawals: 'Toplam Çekimler',
            no_transactions: 'Seçilen filtreler için işlem bulunamadı.',
            rewards: 'Ödüller ve Teşvikler'
          },
          numbers: {
            compact: '{{value, compact}}',
            percent: '{{value, number}}%',
            currency: '{{value, currency}}',
          },
          dashboard: {
            title: 'Panel',
            description: 'AutoYield performansınıza genel bakış',
            notices: {
              title: 'Duyuru Panosu',
              high_yield_title: 'Yüksek Getiri Fırsatı',
              high_yield_message: 'SOL-USDC havuzu şu anda %25,5 APR sunuyor. Pozisyonunuzu artırmayı düşünün.',
              market_update_title: 'Piyasa Güncellemesi',
              market_update_message: 'Bu hafta normalden daha yüksek piyasa oynaklığı bekleniyor. Pozisyonlarınızı yakından izleyin.',
            },
            recent_activity: 'Son Aktivite',
            portfolio_summary: 'Portföy Özeti',
            total_value: 'Toplam Değer',
            average_apr: 'Ortalama APR',
            total_yield: 'Toplam Getiri',
            market_overview: 'Piyasa Genel Bakışı',
            more_details: 'Daha fazla detay',
            top_performing_assets: 'En İyi Performans Gösteren Varlıklar',
            view_all_transactions: 'Tüm işlemleri görüntüle'
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
        },
      },
    }
  });

export default i18n;