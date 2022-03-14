import type { Locale } from 'basx/i18n';

export default function loadLocales(): Promise<Locale> {
  return import('scripts/locale/en.json').then((locale) => locale.default);
}
