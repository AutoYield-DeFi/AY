import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Common translations used across multiple components
      common: {
        buttons: {
          deposit: 'Deposit',
          withdraw: 'Withdraw',
          connect_wallet: 'Connect Wallet',
          disconnect: 'Disconnect',
          confirm: 'Confirm',
          cancel: 'Cancel',
          back: 'Back',
          next: 'Next',
          view_all: 'View All',
          search: 'Search...',
          filter: 'Filter'
        },
        labels: {
          total_value: 'Total Value',
          available_balance: 'Available Balance',
          total_balance: 'Total Balance',
          profit_loss: 'Profit/Loss',
          monthly_yield: 'Monthly Yield',
          staked_value: 'Staked Value',
          total_deposits: 'Total Deposits',
          total_withdrawals: 'Total Withdrawals',
          total_pnl: 'Total P&L',
          positions_count: '{{count}} positions',
          apr: '{{value}}% APR'
        },
        status: {
          loading: 'Loading...',
          processing: 'Processing...',
          error: 'Error occurred',
          success: 'Success!'
        },
        metrics: {
          tvl: 'TVL',
          volume_24h: '24h Volume',
          apr: 'APR'
        }
      },

      // Navigation
      nav: {
        dashboard: 'Dashboard',
        pools: 'Pools',
        portfolio: 'Portfolio',
        history: 'History'
      },

      // Dashboard page
      dashboard: {
        title: 'Dashboard',
        description: 'Track your portfolio performance and market activity',
        performance: {
          title: 'Portfolio Performance',
          description: 'Track your portfolio value and yields over time'
        },
        stats: {
          portfolio_value: 'Portfolio Value',
          portfolio_balance: 'Portfolio Balance',
          total_yield: 'Total Yield',
          daily_yield: 'Daily Yield'
        },
        chart: {
          value: 'Value',
          yield: 'Yield',
          tooltip: {
            value: 'Value: {{value}}',
            yield: 'Yield: {{value}}'
          }
        },
        activity: {
          title: 'Recent Activity',
          description: 'Your latest transactions and updates',
          empty: 'No recent activity'
        }
      },

      // History page
      history: {
        title: 'Transaction History',
        description: 'Track your deposits, withdrawals, and position closures',
        filters: {
          all: 'All Activity',
          deposits: 'Deposits',
          withdrawals: 'Withdrawals',
          positions: 'Closed Positions',
          periods: {
            all: 'All Time',
            week: 'Past Week',
            month: 'Past Month'
          }
        },
        search: {
          placeholder: 'Search by pool name...'
        },
        transaction: {
          types: {
            deposit: 'Deposit',
            withdraw: 'Withdraw',
            position_closed: 'Position Closed'
          },
          details: {
            initial: 'Initial',
            final: 'Final',
            duration: '{{start}} - {{end}}'
          }
        },
        stats: {
          deposits_count: '{{count}} deposits',
          withdrawals_count: '{{count}} withdrawals',
          positions_closed: '{{count}} positions closed'
        },
        empty: {
          title: 'No Transactions Found',
          description: 'Try adjusting your filters or search criteria'
        }
      },

      // Portfolio page
      portfolio: {
        title: 'Portfolio',
        description: 'Track your liquidity positions and returns',
        stats: {
          total_value: 'Total Portfolio Value',
          available_balance: 'Available Balance',
          positions_value: 'Positions Value',
          total_yield: 'Total Yield'
        },
        positions: {
          active: 'Active Positions',
          closed: 'Closed Positions',
          empty: 'No positions found'
        }
      },

      // Pools page
      pools: {
        title: 'Pools',
        description: 'Manage your liquidity positions',
        filters: {
          all: 'All Pools',
          risk: {
            low: 'Low Risk',
            medium: 'Medium Risk',
            high: 'High Risk'
          }
        },
        metrics: {
          tvl: 'Total Value Locked',
          volume: '24h Volume',
          apr: 'Annual Rate',
          utilization: 'Utilization Rate'
        },
        actions: {
          deposit: {
            title: 'Deposit into {{pool}}',
            amount: 'Amount to Deposit',
            estimate: {
              daily: 'Daily Yield',
              yearly: 'Yearly Yield'
            }
          },
          withdraw: {
            title: 'Withdraw from {{pool}}',
            amount: 'Amount to Withdraw',
            current: 'Current Value',
            estimate: 'Estimated P&L'
          }
        }
      }
    }
  }
};

// Add translations for other languages with the same structure
const addLanguage = (lang: string, translations: typeof resources.en.translation) => {
  resources[lang] = { translation: translations };
};

// Spanish translations
addLanguage('es', {
  common: {
    buttons: {
      deposit: 'Depositar',
      withdraw: 'Retirar',
      connect_wallet: 'Conectar Billetera',
      disconnect: 'Desconectar',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      back: 'Atrás',
      next: 'Siguiente',
      view_all: 'Ver Todo',
      search: 'Buscar...',
      filter: 'Filtrar'
    },
    labels: {
      total_value: 'Valor Total',
      available_balance: 'Saldo Disponible',
      total_balance: 'Saldo Total',
      profit_loss: 'Ganancias/Pérdidas',
      monthly_yield: 'Rendimiento Mensual',
      staked_value: 'Valor en Staking',
      total_deposits: 'Depósitos Totales',
      total_withdrawals: 'Retiros Totales',
      total_pnl: 'Ganancias/Pérdidas Totales',
      positions_count: '{{count}} posiciones',
      apr: '{{value}}% APR'
    },
    status: {
      loading: 'Cargando...',
      processing: 'Procesando...',
      error: 'Error',
      success: '¡Éxito!'
    },
    metrics: {
      tvl: 'TVL',
      volume_24h: 'Volumen 24h',
      apr: 'APR'
    }
  },
  nav: {
    dashboard: 'Panel',
    pools: 'Pools',
    portfolio: 'Portafolio',
    history: 'Historial'
  },
  dashboard: {
    title: 'Panel',
    description: 'Controla el rendimiento de tu portafolio',
    performance: {
      title: 'Rendimiento del Portafolio',
      description: 'Sigue el valor de tu portafolio y rendimientos'
    },
    stats: {
      portfolio_value: 'Valor del Portafolio',
      portfolio_balance: 'Balance del Portafolio',
      total_yield: 'Rendimiento Total',
      daily_yield: 'Rendimiento Diario'
    },
    chart: {
      value: 'Valor',
      yield: 'Rendimiento',
      tooltip: {
        value: 'Valor: {{value}}',
        yield: 'Rendimiento: {{value}}'
      }
    },
    activity: {
      title: 'Actividad Reciente',
      description: 'Tus últimas transacciones y actualizaciones',
      empty: 'Sin actividad reciente'
    }
  },
  history: {
    title: 'Historial de Transacciones',
    description: 'Rastrea tus depósitos, retiros y cierres de posiciones',
    filters: {
      all: 'Toda la Actividad',
      deposits: 'Depósitos',
      withdrawals: 'Retiros',
      positions: 'Posiciones Cerradas',
      periods: {
        all: 'Todo el Tiempo',
        week: 'Última Semana',
        month: 'Último Mes'
      }
    },
    search: {
      placeholder: 'Buscar por nombre del pool...'
    },
    transaction: {
      types: {
        deposit: 'Depósito',
        withdraw: 'Retiro',
        position_closed: 'Posición Cerrada'
      },
      details: {
        initial: 'Inicial',
        final: 'Final',
        duration: '{{start}} - {{end}}'
      }
    },
    stats: {
      deposits_count: '{{count}} depósitos',
      withdrawals_count: '{{count}} retiros',
      positions_closed: '{{count}} posiciones cerradas'
    },
    empty: {
      title: 'No se encontraron transacciones',
      description: 'Intenta ajustar tus filtros o criterios de búsqueda'
    }
  },
  portfolio: {
    title: 'Portafolio',
    description: 'Gestiona tus posiciones de liquidez',
    stats: {
      total_value: 'Valor Total del Portafolio',
      available_balance: 'Saldo Disponible',
      positions_value: 'Valor de Posiciones',
      total_yield: 'Rendimiento Total'
    },
    positions: {
      active: 'Posiciones Activas',
      closed: 'Posiciones Cerradas',
      empty: 'No se encontraron posiciones'
    }
  },
  pools: {
    title: 'Pools',
    description: 'Gestiona tus posiciones de liquidez',
    filters: {
      all: 'Todos los Pools',
      risk: {
        low: 'Riesgo Bajo',
        medium: 'Riesgo Medio',
        high: 'Riesgo Alto'
      }
    },
    metrics: {
      tvl: 'Valor Total Bloqueado',
      volume: 'Volumen 24h',
      apr: 'Tasa Anual',
      utilization: 'Tasa de Utilización'
    },
    actions: {
      deposit: {
        title: 'Depositar en {{pool}}',
        amount: 'Cantidad a Depositar',
        estimate: {
          daily: 'Rendimiento Diario',
          yearly: 'Rendimiento Anual'
        }
      },
      withdraw: {
        title: 'Retirar de {{pool}}',
        amount: 'Cantidad a Retirar',
        current: 'Valor Actual',
        estimate: 'Ganancia/Pérdida Estimada'
      }
    }
  }
});

// Japanese translations
addLanguage('ja', {
  common: {
    buttons: {
      deposit: '預入',
      withdraw: '引出',
      connect_wallet: 'ウォレットを接続',
      disconnect: '切断',
      confirm: '確認',
      cancel: 'キャンセル',
      back: '戻る',
      next: '次へ',
      view_all: 'すべて表示',
      search: '検索...',
      filter: 'フィルター'
    },
    labels: {
      total_value: '総額',
      available_balance: '利用可能残高',
      total_balance: '合計残高',
      profit_loss: '損益',
      monthly_yield: '月次利回り',
      staked_value: 'ステーキング額',
      total_deposits: '総預入額',
      total_withdrawals: '総引出額',
      total_pnl: '総損益',
      positions_count: '{{count}}件のポジション',
      apr: '{{value}}% APR'
    },
    status: {
      loading: '読み込み中...',
      processing: '処理中...',
      error: 'エラーが発生しました',
      success: '成功しました！'
    },
    metrics: {
      tvl: 'TVL',
      volume_24h: '24時間取引量',
      apr: 'APR'
    }
  },
  nav: {
    dashboard: 'ダッシュボード',
    pools: 'プール',
    portfolio: 'ポートフォリオ',
    history: '履歴'
  },
  dashboard: {
    title: 'ダッシュボード',
    description: 'ポートフォリオのパフォーマンスを追跡',
    performance: {
      title: 'ポートフォリオパフォーマンス',
      description: 'ポートフォリオの価値と利回りを追跡'
    },
    stats: {
      portfolio_value: 'ポートフォリオ価値',
      portfolio_balance: 'ポートフォリオ残高',
      total_yield: '総利回り',
      daily_yield: '日次利回り'
    },
    chart: {
      value: '価値',
      yield: '利回り',
      tooltip: {
        value: '価値: {{value}}',
        yield: '利回り: {{value}}'
      }
    },
    activity: {
      title: '最近の活動',
      description: '最新の取引と更新',
      empty: '最近の活動はありません'
    }
  },
  history: {
    title: '取引履歴',
    description: '預入、引出、ポジション終了を追跡',
    filters: {
      all: '全ての活動',
      deposits: '預入',
      withdrawals: '引出',
      positions: '終了したポジション',
      periods: {
        all: '全期間',
        week: '過去1週間',
        month: '過去1ヶ月'
      }
    },
    search: {
      placeholder: 'プール名で検索...'
    },
    transaction: {
      types: {
        deposit: '預入',
        withdraw: '引出',
        position_closed: 'ポジション終了'
      },
      details: {
        initial: '開始時',
        final: '終了時',
        duration: '{{start}} - {{end}}'
      }
    },
    stats: {
      deposits_count: '{{count}}件の預入',
      withdrawals_count: '{{count}}件の引出',
      positions_closed: '{{count}}件のポジション終了'
    },
    empty: {
      title: '取引が見つかりません',
      description: 'フィルターまたは検索条件を調整してください'
    }
  },
  portfolio: {
    title: 'ポートフォリオ',
    description: '流動性ポジションを管理',
    stats: {
      total_value: 'ポートフォリオ総額',
      available_balance: '利用可能残高',
      positions_value: 'ポジション価値',
      total_yield: '総利回り'
    },
    positions: {
      active: 'アクティブなポジション',
      closed: '終了したポジション',
      empty: 'ポジションが見つかりません'
    }
  },
  pools: {
    title: 'プール',
    description: '流動性ポジションを管理',
    filters: {
      all: '全てのプール',
      risk: {
        low: '低リスク',
        medium: '中リスク',
        high: '高リスク'
      }
    },
    metrics: {
      tvl: 'ロック済み総額',
      volume: '24時間取引量',
      apr: '年利率',
      utilization: '利用率'
    },
    actions: {
      deposit: {
        title: '{{pool}}に預入',
        amount: '預入額',
        estimate: {
          daily: '日次利回り',
          yearly: '年間利回り'
        }
      },
      withdraw: {
        title: '{{pool}}から引出',
        amount: '引出額',
        current: '現在価値',
        estimate: '予想損益'
      }
    }
  }
});

// Turkish translations (simplified structure, same as others)
addLanguage('tr', {
  common: {
    buttons: {
      deposit: 'Yatır',
      withdraw: 'Çek',
      connect_wallet: 'Cüzdan Bağla',
      disconnect: 'Bağlantıyı Kes',
      confirm: 'Onayla',
      cancel: 'İptal',
      back: 'Geri',
      next: 'İleri',
      view_all: 'Tümünü Görüntüle',
      search: 'Ara...',
      filter: 'Filtrele'
    },
    labels: {
      total_value: 'Toplam Değer',
      available_balance: 'Kullanılabilir Bakiye',
      total_balance: 'Toplam Bakiye',
      profit_loss: 'Kar/Zarar',
      monthly_yield: 'Aylık Getiri',
      staked_value: 'Stake Edilmiş Değer',
      total_deposits: 'Toplam Yatırımlar',
      total_withdrawals: 'Toplam Çekimler',
      total_pnl: 'Toplam Kar/Zarar',
      positions_count: '{{count}} pozisyon',
      apr: '{{value}}% APR'
    },
    status: {
      loading: 'Yükleniyor...',
      processing: 'İşleniyor...',
      error: 'Hata Oluştu',
      success: 'Başarılı!'
    },
    metrics: {
      tvl: 'TVL',
      volume_24h: '24s Hacim',
      apr: 'APR'
    }
  },
  nav: {
    dashboard: 'Panel',
    pools: 'Havuzlar',
    portfolio: 'Portföy',
    history: 'Geçmiş'
  },
  dashboard: {
    title: 'Panel',
    description: 'Portföy performansınızı takip edin',
    performance: {
      title: 'Portföy Performansı',
      description: 'Portföy değerinizi ve getirilerinizi takip edin'
    },
    stats: {
      portfolio_value: 'Portföy Değeri',
      portfolio_balance: 'Portföy Bakiyesi',
      total_yield: 'Toplam Getiri',
      daily_yield: 'Günlük Getiri'
    },
    chart: {
      value: 'Değer',
      yield: 'Getiri',
      tooltip: {
        value: 'Değer: {{value}}',
        yield: 'Getiri: {{value}}'
      }
    },
    activity: {
      title: 'Son Aktivite',
      description: 'Son işlemleriniz ve güncellemeler',
      empty: 'Son aktivite yok'
    }
  },
  history: {
    title: 'İşlem Geçmişi',
    description: 'Yatırımlarınızı, çekimlerinizi ve pozisyon kapatmalarınızı takip edin',
    filters: {
      all: 'Tüm Aktivite',
      deposits: 'Yatırımlar',
      withdrawals: 'Çekimler',
      positions: 'Kapatılan Pozisyonlar',
      periods: {
        all: 'Tüm Zamanlar',
        week: 'Geçen Hafta',
        month: 'Geçen Ay'
      }
    },
    search: {
      placeholder: 'Havuz adına göre ara...'
    },
    transaction: {
      types: {
        deposit: 'Yatırım',
        withdraw: 'Çekim',
        position_closed: 'Pozisyon Kapatıldı'
      },
      details: {
        initial: 'Başlangıç',
        final: 'Bitiş',
        duration: '{{start}} - {{end}}'
      }
    },
    stats: {
      deposits_count: '{{count}} yatırım',
      withdrawals_count: '{{count}} çekim',
      positions_closed: '{{count}} pozisyon kapatıldı'
    },
    empty: {
      title: 'İşlem Bulunamadı',
      description: 'Filtrelerinizi veya arama kriterlerinizi ayarlamayı deneyin'
    }
  },
  portfolio: {
    title: 'Portföy',
    description: 'Likidite pozisyonlarınızı yönetin',
    stats: {
      total_value: 'Toplam Portföy Değeri',
      available_balance: 'Kullanılabilir Bakiye',
      positions_value: 'Pozisyon Değeri',
      total_yield: 'Toplam Getiri'
    },
    positions: {
      active: 'Aktif Pozisyonlar',
      closed: 'Kapatılan Pozisyonlar',
      empty: 'Pozisyon bulunamadı'
    }
  },
  pools: {
    title: 'Havuzlar',
    description: 'Likidite pozisyonlarınızı yönetin',
    filters: {
      all: 'Tüm Havuzlar',
      risk: {
        low: 'Düşük Risk',
        medium: 'Orta Risk',
        high: 'Yüksek Risk'
      }
    },
    metrics: {
      tvl: 'Kilitli Toplam Değer',
      volume: '24s Hacim',
      apr: 'Yıllık Oran',
      utilization: 'Kullanım Oranı'
    },
    actions: {
      deposit: {
        title: '{{pool}} Havuzuna Yatır',
        amount: 'Yatırılacak Miktar',
        estimate: {
          daily: 'Günlük Getiri',
          yearly: 'Yıllık Getiri'
        }
      },
      withdraw: {
        title: '{{pool}} Havuzundan Çek',
        amount: 'Çekilecek Miktar',
        current: 'Güncel Değer',
        estimate: 'Tahmini Kar/Zarar'
      }
    }
  }
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;