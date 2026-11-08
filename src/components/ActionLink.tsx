import type { ReactNode } from 'react';
import { useI18n } from '../i18n';

interface ActionLinkProps {
  /** Target URL. null renders a disabled "Coming soon" element instead of a dead link. */
  href: string | null;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
}

/** Button-styled link. External links open in a new tab and say so to screen readers. */
export function ActionLink({ href, children, variant = 'primary', size = 'md', icon, className = '' }: ActionLinkProps) {
  const { t } = useI18n();
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href === null) {
    return (
      <span className={`${classes} btn--disabled`} aria-disabled="true">
        {icon}
        <span>{children}</span>
        <span className="btn__soon">{t.common.comingSoon}</span>
      </span>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      className={classes}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      <span>{children}</span>
      {external && <span className="sr-only"> {t.common.opensInNewTab}</span>}
    </a>
  );
}
