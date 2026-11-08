import { CircleAlert, Download, FileText, History, Hourglass, Package } from 'lucide-react';
import { ActionLink } from '../components/ActionLink';
import { GithubIcon } from '../components/GithubIcon';
import { SectionHeader } from '../components/SectionHeader';
import { links } from '../config/site';
import { latestRelease } from '../data/releases';
import { useI18n } from '../i18n';
import { formatDate, formatMegabytes } from '../lib/format';

export function DownloadSection() {
  const { t, lang } = useI18n();
  // Static data: the website never asks an external service for release information.
  const release = latestRelease;
  const downloadUrl = release?.downloadUrl ?? null;
  const available = release !== null && downloadUrl !== null;

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
                  {release ? `RoadPilot ${release.version}` : t.download.noRelease}
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

            {!available && (
              <div className="download__soon" role="status">
                <h3>{t.download.comingSoonTitle}</h3>
                <p>{t.download.comingSoonText}</p>
              </div>
            )}

            {available && (
              <>
                <div className="download__actions">
                  <ActionLink href={downloadUrl} size="lg" icon={<Download size={19} aria-hidden="true" />}>
                    {t.download.downloadButton}
                  </ActionLink>
                </div>

                <ul className="download__links">
                  <li>
                    <ActionLink href={links.releaseTag(release.version)} variant="ghost" icon={<GithubIcon size={16} />}>
                      {t.download.githubRelease}
                    </ActionLink>
                  </li>
                  <li>
                    <ActionLink href={links.releaseTag(release.version)} variant="ghost" icon={<FileText size={16} aria-hidden="true" />}>
                      {t.download.releaseNotes}
                    </ActionLink>
                  </li>
                  <li>
                    <ActionLink href={links.releases} variant="ghost" icon={<History size={16} aria-hidden="true" />}>
                      {t.download.previousVersions}
                    </ActionLink>
                  </li>
                </ul>
              </>
            )}
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
