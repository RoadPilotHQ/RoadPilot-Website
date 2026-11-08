interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ id, eyebrow, title, intro, align = 'left' }: SectionHeaderProps) {
  return (
    <header className={`section-header section-header--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
