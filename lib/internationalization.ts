export interface LocaleConfig {
  code: string
  name: string
  flag: string
  rtl: boolean
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: "en", name: "English", flag: "🇺🇸", rtl: false },
  { code: "es", name: "Español", flag: "🇪🇸", rtl: false },
  { code: "fr", name: "Français", flag: "🇫🇷", rtl: false },
  { code: "de", name: "Deutsch", flag: "🇩🇪", rtl: false },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "zh", name: "中文", flag: "🇨🇳", rtl: false },
  { code: "ja", name: "日本語", flag: "🇯🇵", rtl: false },
]

export interface CurrencyConfig {
  code: string
  name: string
  symbol: string
  decimals: number
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: "USD", name: "US Dollar", symbol: "$", decimals: 2 },
  { code: "EUR", name: "Euro", symbol: "€", decimals: 2 },
  { code: "GBP", name: "British Pound", symbol: "£", decimals: 2 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", decimals: 0 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", decimals: 2 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", decimals: 2 },
]

export class LocalizationService {
  private static instance: LocalizationService
  private currentLocale = "en"
  private currentCurrency = "USD"
  private currentTimezone = "UTC"

  static getInstance(): LocalizationService {
    if (!LocalizationService.instance) {
      LocalizationService.instance = new LocalizationService()
    }
    return LocalizationService.instance
  }

  setLocale(locale: string) {
    this.currentLocale = locale
  }

  getLocale(): string {
    return this.currentLocale
  }

  setCurrency(currency: string) {
    this.currentCurrency = currency
  }

  getCurrency(): string {
    return this.currentCurrency
  }

  setTimezone(timezone: string) {
    this.currentTimezone = timezone
  }

  getTimezone(): string {
    return this.currentTimezone
  }

  formatCurrency(amount: number, currency?: string): string {
    const currencyCode = currency || this.currentCurrency
    const config = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode)

    if (!config) return amount.toString()

    return new Intl.NumberFormat(this.currentLocale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    }).format(amount)
  }

  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: this.currentTimezone,
    }

    return new Intl.DateTimeFormat(this.currentLocale, {
      ...defaultOptions,
      ...options,
    }).format(date)
  }

  formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat(this.currentLocale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: this.currentTimezone,
    }).format(date)
  }

  formatNumber(number: number): string {
    return new Intl.NumberFormat(this.currentLocale).format(number)
  }
}
