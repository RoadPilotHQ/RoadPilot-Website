export const LEGAL_CONFIG_ENV: string;
export const DEFAULT_LEGAL_CONFIG: string;

export interface LegalDetails {
  name: string;
  addressLines: string[];
  email: string;
}

export interface LoadedLegalConfig extends LegalDetails {
  /** True only for the development server's visibly marked [[placeholders]]. Never true in a build. */
  isPlaceholder: boolean;
}

export const DEV_PLACEHOLDER: Readonly<LegalDetails>;

export function validateLegalConfig(raw: unknown): { errors: string[]; config: LegalDetails | null };

export function loadLegalConfig(options: {
  root: string;
  command: 'build' | 'serve';
  env?: Record<string, string | undefined>;
}): { config: LoadedLegalConfig; source: string | null };
