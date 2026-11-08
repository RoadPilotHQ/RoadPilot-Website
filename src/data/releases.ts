/** A published release and its Windows installer. */
export interface Release {
  version: string;
  /** Publication date (ISO 8601). */
  date: string;
  /** Installer file name as uploaded to the release. */
  installer: string;
  /** Installer size in bytes. */
  installerSize: number;
  /** Direct download URL of the installer, from the published release. */
  downloadUrl: string;
}

/**
 * The latest published release. null while there is none: the download section then shows
 * "Coming soon" and no download or release links.
 *
 * The website makes no network request to look up releases. When a real release exists,
 * add its verified data here (version, date, installer name and size, download URL).
 */
export const latestRelease: Release | null = null;
