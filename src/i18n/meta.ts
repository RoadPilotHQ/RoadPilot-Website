import type { Language, PageKey } from './languages';

/**
 * Page titles and descriptions per language. This is the single source for the <title>, the meta
 * description and the Open Graph data written into every HTML file at build time (see
 * vite.config.ts) and for the title kept in sync at runtime. It must stay free of imports that
 * need the browser or the local legal configuration.
 */
export interface PageMeta {
  title: string;
  description: string;
}

export const pageMeta: Record<Language, Record<PageKey, PageMeta>> = {
  en: {
    home: {
      title: 'RoadPilot – Driving assistance for ETS2 and ATS',
      description:
        'RoadPilot is a free, independent driving assistance project for Euro Truck Simulator 2 and American Truck Simulator, with a native Windows desktop app.',
    },
    imprint: {
      title: 'Imprint | RoadPilot',
      description: 'Legal information and website operator details for RoadPilot.',
    },
    privacy: {
      title: 'Privacy Policy – RoadPilot',
      description: 'Privacy policy of the RoadPilot website.',
    },
  },
  de: {
    home: {
      title: 'RoadPilot – Fahrassistenz für ETS2 und ATS',
      description:
        'RoadPilot ist ein kostenloses, unabhängiges Projekt für Fahrassistenz in Euro Truck Simulator 2 und American Truck Simulator, mit einer nativen Windows-Desktop-App.',
    },
    imprint: {
      title: 'Impressum | RoadPilot',
      description: 'Rechtliche Angaben und Betreiberinformationen der RoadPilot-Website.',
    },
    privacy: {
      title: 'Datenschutzerklärung – RoadPilot',
      description: 'Datenschutzerklärung der RoadPilot-Website.',
    },
  },
  nl: {
    home: {
      title: 'RoadPilot – Rijassistentie voor ETS2 en ATS',
      description:
        'RoadPilot is een gratis, onafhankelijk project voor rijassistentie in Euro Truck Simulator 2 en American Truck Simulator, met een native Windows-desktopapp.',
    },
    imprint: {
      title: 'Colofon | RoadPilot',
      description: 'Juridische informatie en gegevens van de beheerder van de RoadPilot-website.',
    },
    privacy: {
      title: 'Privacyverklaring – RoadPilot',
      description: 'Privacyverklaring van de RoadPilot-website.',
    },
  },
};

/** Text shown by browsers without JavaScript. {who} is replaced by the legal details at build time. */
export const noscriptText: Record<Language, { home: string; imprint: string }> = {
  en: {
    home: 'RoadPilot is a free, independent driving assistance project for Euro Truck Simulator 2 and American Truck Simulator. Please enable JavaScript to view this website.',
    imprint:
      'Imprint – Responsible for this website: {who}. RoadPilot is a private, non-commercial software project.',
  },
  de: {
    home: 'RoadPilot ist ein kostenloses, unabhängiges Projekt für Fahrassistenz in Euro Truck Simulator 2 und American Truck Simulator. Bitte aktiviere JavaScript, um diese Website anzuzeigen.',
    imprint:
      'Impressum – Verantwortlich für diese Website: {who}. RoadPilot ist ein privates, nicht kommerzielles Softwareprojekt.',
  },
  nl: {
    home: 'RoadPilot is een gratis, onafhankelijk project voor rijassistentie in Euro Truck Simulator 2 en American Truck Simulator. Schakel JavaScript in om deze website te bekijken.',
    imprint:
      'Colofon – Verantwoordelijk voor deze website: {who}. RoadPilot is een privé, niet-commercieel softwareproject.',
  },
};
