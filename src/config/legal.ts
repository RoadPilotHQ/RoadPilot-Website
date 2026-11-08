/**
 * Legal details for the imprint and privacy pages. They are injected at build time from the
 * local, ignored file config/legal.local.json (see vite.config.ts and config/legalConfig.mjs),
 * so no personal data is stored in the repository.
 */
interface LegalDetails {
  name: string;
  addressLines: string[];
  email: string;
  /** True only on the development server, where visible [[placeholders]] are shown. */
  isPlaceholder: boolean;
}

declare const __LEGAL__: LegalDetails;

export const legal: LegalDetails = __LEGAL__;
