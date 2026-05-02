import { defaultLocale } from '@/lib/i18n';

export default function RootPage() {
  return (
    <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
  );
}
