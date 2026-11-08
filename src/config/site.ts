import { legal } from './legal';

/**
 * Central site configuration. Every external link on the website is derived
 * from here, so nothing has to be changed inside components.
 */
export const site = {
  url: 'https://roadpilot.cc',

  repository: {
    url: 'https://github.com/OranjeDev/RoadPilot',
    /** Set to false again if the repository becomes private. */
    isPublic: true,
    discussionsEnabled: true,
  },

  /** Public contact address. null shows a "not published yet" placeholder. */
  contactEmail: (legal.isPlaceholder ? null : legal.email) as string | null,
} as const;

const repo = site.repository;
const publicRepoUrl = repo.isPublic ? repo.url : null;

/** External links. A value of null means "not available yet". */
export const links = {
  github: publicRepoUrl,
  releases: publicRepoUrl && `${publicRepoUrl}/releases`,
  latestRelease: publicRepoUrl && `${publicRepoUrl}/releases/latest`,
  releaseTag: (version: string) => publicRepoUrl && `${publicRepoUrl}/releases/tag/v${version}`,
  releaseAsset: (version: string, asset: string) =>
    publicRepoUrl && `${publicRepoUrl}/releases/download/v${version}/${asset}`,
  issues: publicRepoUrl && `${publicRepoUrl}/issues`,
  newIssue: publicRepoUrl && `${publicRepoUrl}/issues/new`,
  discussions: publicRepoUrl && repo.discussionsEnabled ? `${publicRepoUrl}/discussions` : null,
  email: site.contactEmail && `mailto:${site.contactEmail}`,
} as const;
