import { Bug, Mail, MessageSquareHeart, MessagesSquare } from 'lucide-react';
import type { ReactNode } from 'react';
import { ActionLink } from '../components/ActionLink';
import { GithubIcon } from '../components/GithubIcon';
import { RichText } from '../components/RichText';
import { SectionHeader } from '../components/SectionHeader';
import { links, site } from '../config/site';
import { useI18n } from '../i18n';

interface ChannelProps {
  icon: ReactNode;
  title: string;
  text: string;
  href: string | null;
  action: ReactNode;
}

function Channel({ icon, title, text, href, action }: ChannelProps) {
  return (
    <li className="card channel">
      <span className="icon-tile" aria-hidden="true">
        {icon}
      </span>
      <h3 className="channel__title">{title}</h3>
      <p className="channel__text">{text}</p>
      <div className="channel__action">
        {href ? (
          <ActionLink href={href} variant="secondary">
            {action}
          </ActionLink>
        ) : (
          <span className="channel__unavailable">{action}</span>
        )}
      </div>
    </li>
  );
}

export function Community() {
  const { t } = useI18n();
  const c = t.community;
  const feedbackHref = links.newIssue ?? links.email;

  return (
    <section id="community" className="section" aria-labelledby="community-title">
      <div className="container">
        <SectionHeader id="community-title" eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

        <ul className="channels">
          <Channel
            icon={<GithubIcon size={22} />}
            title={c.repository.title}
            text={c.repository.text}
            href={links.github}
            action={links.github ? c.open : t.common.comingSoon}
          />
          <Channel
            icon={<Bug size={22} />}
            title={c.issues.title}
            text={c.issues.text}
            href={links.issues}
            action={links.issues ? c.open : t.common.comingSoon}
          />
          <Channel
            icon={<MessagesSquare size={22} />}
            title={c.discussions.title}
            text={c.discussions.text}
            href={links.discussions}
            action={links.discussions ? c.open : c.discussionsDisabled}
          />
          <Channel
            icon={<Mail size={22} />}
            title={c.contact.title}
            text={c.contact.text}
            href={links.email}
            action={site.contactEmail ?? <RichText text={c.contactMissing} />}
          />
        </ul>

        <div className="feedback">
          <MessageSquareHeart size={34} aria-hidden="true" className="feedback__icon" />
          <div className="feedback__copy">
            <h3 className="feedback__title">{c.feedback.title}</h3>
            <p className="feedback__text">{c.feedback.text}</p>
          </div>
          <ActionLink href={feedbackHref} size="lg">
            {c.feedback.action}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
