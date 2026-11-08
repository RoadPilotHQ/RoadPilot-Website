import type { FeatureStatus } from '../data/status';
import { useI18n } from '../i18n';

export function StatusBadge({ status }: { status: FeatureStatus }) {
  const { t } = useI18n();
  return <span className={`badge badge--${status}`}>{t.status[status]}</span>;
}
