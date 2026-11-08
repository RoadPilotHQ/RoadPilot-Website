/** A published GitHub release and its Windows installer. */
export interface Release {
  version: string;
  /** Publication date (ISO 8601). */
  date: string;
  /** Installer file name as uploaded to the GitHub release. */
  installer: string;
  /** Installer size in bytes. */
  installerSize: number;
  /** Direct GitHub download URL for this release's installer. */
  downloadUrl: string;
}

/** Releases documented in the website changelog, newest first. */
export const releases: readonly Release[] = [
  {
    version: '0.2.0',
    date: '2026-10-31',
    installer: 'RoadPilot_0.2.0_x64-setup.exe',
    installerSize: 1_915_566,
    downloadUrl: 'https://github.com/OranjeDev/RoadPilot/releases/download/v0.2.0/RoadPilot_0.2.0_x64-setup.exe',
  },
];

interface GitHubRelease {
  tag_name?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  published_at?: unknown;
  assets?: unknown;
}

interface GitHubAsset {
  name?: unknown;
  size?: unknown;
  browser_download_url?: unknown;
}

/** Fetch GitHub's latest stable, published release and choose its x64 installer. */
export async function fetchLatestRelease(repositoryUrl: string): Promise<Release | null> {
  const match = repositoryUrl.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/?$/);
  if (!match) return null;

  try {
    const response = await fetch(`https://api.github.com/repos/${match[1]}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store',
    });
    if (!response.ok) return null;

    const release = (await response.json()) as GitHubRelease;
    if (release.draft === true || release.prerelease === true || typeof release.tag_name !== 'string') return null;

    const assets = Array.isArray(release.assets) ? (release.assets as GitHubAsset[]) : [];
    const installer = assets.find(
      (asset) =>
        typeof asset.name === 'string' &&
        /^RoadPilot_.+_x64-setup\.exe$/i.test(asset.name) &&
        typeof asset.browser_download_url === 'string',
    );
    if (!installer || typeof installer.name !== 'string' || typeof installer.browser_download_url !== 'string') {
      return null;
    }

    return {
      version: release.tag_name.replace(/^v/i, ''),
      date: typeof release.published_at === 'string' ? release.published_at.slice(0, 10) : '',
      installer: installer.name,
      installerSize: typeof installer.size === 'number' ? installer.size : 0,
      downloadUrl: installer.browser_download_url,
    };
  } catch {
    return null;
  }
}

/** Draft release version shown while no published release is available. */
export const plannedRelease: { version: string } | null = null;
