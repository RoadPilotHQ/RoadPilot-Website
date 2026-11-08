import { useEffect, useState } from 'react';
import { CircleAlert, Download, FileText, History, Hourglass, Package } from 'lucide-react';
import { ActionLink } from '../components/ActionLink';
import { GithubIcon } from '../components/GithubIcon';
import { SectionHeader } from '../components/SectionHeader';
import { links, site } from '../config/site';
import { fetchLatestRelease, plannedRelease, type Release } from '../data/releases';
import { format, useI18n } from '../i18n';
import { formatDate, formatMegabytes } from '../lib/format';

export function DownloadSection() {
  const { t, lang } = useI18n();
  const [release, setRelease] = useState<Release | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    fetchLatestRelease(site.repository.url).then((latest) => {
      if (active) {
        setRelease(latest);
        setChecking(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const downloadUrl = release?.downloadUrl ?? null;
  const available = downloadUrl !== null;

  return (
    <section id="download" className="section section--tinted" aria-labelledby="download-title">
      <div className="container">
        <SectionHeader id="download-title" eyebrow={t.download.eyebrow} title={t.download.title} intro={t.download.intro} />

        <div className="download">
          <div className="card download__main">
            <div className="download__top">
              <span className="icon-tile icon-tile--lg" aria-hidden="true">
                {available ? <Package size={28} /> : <Hourglass size={28} />}
              </span>
              <div>
                <p className="download__label">{t.download.latestRelease}</p>
                <p className="download__version">
                  {release
                    ? `RoadPilot ${release.version}`
                    : checking
                      ? t.download.checkingRelease
                      : t.download.noRelease}
                </p>
              </div>
            </div>

            {release && (
              <dl className="download__meta">
                <div>
                  <dt>{t.download.releaseDate}</dt>
                  <dd>
                    <time dateTime={release.date}>{formatDate(release.date, lang)}</time>
                  </dd>
                </div>
                <div>
                  <dt>{t.download.releaseStatus}</dt>
                  <dd>{t.download.statusEarly}</dd>
                </div>
                <div>
                  <dt>{t.download.installerSize}</dt>
                  <dd>{formatMegabytes(release.installerSize, lang)}</dd>
                </div>
                <div>
                  <dt>{t.download.platform}</dt>
                  <dd>{t.download.platformValue}</dd>
                </div>
              </dl>
            )}

            {!available && !checking && (
              <div className="download__soon" role="status">
                <h3>{t.download.comingSoonTitle}</h3>
                {/* A draft release is only reported as a status, never linked. */}
                {!release && plannedRelease ? (
                  <>
                    <p className="download__planned">{t.download.upcomingStatus}</p>
                    <p>{format(t.download.upcomingText, { version: plannedRelease.version })}</p>
                  </>
                ) : (
                  <p>{t.download.comingSoonText}</p>
                )}
              </div>
            )}

            <div className="download__actions">
              <ActionLink href={downloadUrl} size="lg" icon={<Download size={19} aria-hidden="true" />}>
                {t.download.downloadButton}
              </ActionLink>
            </div>

            <ul className="download__links">
              <li>
                <ActionLink href={links.latestRelease} variant="ghost" icon={<GithubIcon size={16} />}>
                  {t.download.githubReleases}
                </ActionLink>
              </li>
              <li>
                {/* The release notes are always readable in the changelog below. */}
                <ActionLink
                  href={release ? (links.releaseTag(release.version) ?? '#changelog') : null}
                  variant="ghost"
                  icon={<FileText size={16} aria-hidden="true" />}
                >
                  {t.download.releaseNotes}
                </ActionLink>
              </li>
              <li>
                <ActionLink href={links.releases} variant="ghost" icon={<History size={16} aria-hidden="true" />}>
                  {t.download.previousVersions}
                </ActionLink>
              </li>
            </ul>
          </div>

          <aside className="card download__side" aria-labelledby="requirements-title">
            <h3 id="requirements-title" className="download__side-title">
              {t.download.requirementsTitle}
            </h3>
            <ul className="checklist">
              {t.download.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
            <p className="notice">
              <CircleAlert size={18} aria-hidden="true" />
              <span>{t.download.notice}</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
