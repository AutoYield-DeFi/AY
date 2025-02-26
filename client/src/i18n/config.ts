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
            total_value: 'Total Value',
            total_pnl: 'Total P&L',
            apr: 'APR',
            tvl: 'TVL',
            volume_24h: '24h Volume',
            deposit: 'Deposit',
            withdraw: 'Withdraw',
          },
          pools: {
            title: 'Liquidity Pools',
            description: 'Manage your liquidity positions',
            create_pool: 'Create Pool',
            fee_tier: 'Fee Tier',
            daily_fees: 'Daily Fees',
            weekly_volume: 'Weekly Volume',
            risk_level: 'Risk Level',
            impermanent_loss: 'Impermanent Loss',
            utilization: 'Utilization',
            low: 'Low',
            medium: 'Medium',
            high: 'High',
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
            total_value: 'Valor Total',
            total_pnl: 'Ganancias y Pérdidas',
            apr: 'TAE',
            tvl: 'VTB',
            volume_24h: 'Volumen 24h',
            deposit: 'Depositar',
            withdraw: 'Retirar',
          },
          pools: {
            title: 'Pools de Liquidez',
            description: 'Gestiona tus posiciones de liquidez',
            create_pool: 'Crear Pool',
            fee_tier: 'Nivel de Comisión',
            daily_fees: 'Comisiones Diarias',
            weekly_volume: 'Volumen Semanal',
            risk_level: 'Nivel de Riesgo',
            impermanent_loss: 'Pérdida Impermanente',
            utilization: 'Utilización',
            low: 'Bajo',
            medium: 'Medio',
            high: 'Alto',
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
