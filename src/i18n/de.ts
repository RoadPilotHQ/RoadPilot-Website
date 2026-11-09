import { legal } from '../config/legal';
import type { Messages } from './en';

/**
 * Alle sichtbaren Website-Texte auf Deutsch. Die Struktur muss exakt der von en.ts entsprechen.
 * Begriffe: Autonomes Fahren, Spurhalteassistent, Fahrassistenz, Spielanbindung, Fahrzeugtelemetrie,
 * Release und Download. Produkt- und Repository-Namen werden nicht übersetzt.
 * Text in [[doppelten eckigen Klammern]] ist ein Platzhalter und wird auf der Seite hervorgehoben.
 */
export const de: Messages = {
  common: {
    skipToContent: 'Zum Inhalt springen',
    comingSoon: 'Demnächst',
    notPublicYet: 'Das GitHub-Repository ist noch nicht öffentlich.',
    opensInNewTab: '(öffnet in einem neuen Tab)',
    backToHome: 'Zurück zur Startseite',
  },

  status: {
    available: 'Verfügbar',
    demo: 'Demo-Vorschau',
    experimental: 'Experimentell',
    inDevelopment: 'In Entwicklung',
    planned: 'Geplant',
  },

  nav: {
    label: 'Hauptnavigation',
    home: 'Startseite',
    features: 'Funktionen',
    roadmap: 'Roadmap',
    faq: 'FAQ',
    github: 'GitHub',
    language: 'Sprache',
    download: 'Download',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
  },

  hero: {
    eyebrow: 'Für Euro Truck Simulator 2 und American Truck Simulator',
    title: 'Dein Truck. Deine Straße. Deine Kontrolle.',
    text: 'RoadPilot ist ein intelligentes Projekt für Fahrassistenz in Euro Truck Simulator 2 und American Truck Simulator.',
    download: 'Download',
    github: 'GitHub',
    compatibility: 'Windows 10 und 11 (64 Bit) · Kostenlos · Frühe Entwicklung',
  },

  principles: {
    label: 'Projektprinzipien',
    items: [
      { title: 'Ehrliche Daten', text: 'Fehlende Daten werden als fehlend angezeigt. Simulierte Werte sind immer als Demo-Daten gekennzeichnet.' },
      { title: 'Sicherheit zuerst', text: 'RoadPilot fährt nur, wenn du es startest, und hält bei jedem Zweifel an.' },
      { title: 'Schlank', text: 'Eine native Windows-App, geschrieben in Rust: klein und schnell.' },
      { title: 'Kostenlos', text: 'RoadPilot ist kostenlos nutzbar. Keine Abos, keine kostenpflichtigen Stufen.' },
    ],
  },

  features: {
    eyebrow: 'Funktionen',
    title: 'Was RoadPilot heute kann und was als Nächstes kommt',
    intro:
      'RoadPilot befindet sich in aktiver Entwicklung. Jede Funktion unten wird noch entwickelt und getestet und kann sich ändern, bevor sie fertig ist.',
    items: {
      laneKeeping: {
        title: 'Spurhalteassistent',
        text: 'Hält den Truck anhand der Spurdaten aus den Kartendateien des Spiels mittig in der Fahrspur, in der Regel innerhalb von 0,1–0,3 m zur Spurmitte.',
        note: 'Nur ATS. Noch nicht in einem Release. An Abzweigungen, Ausfahrten und beim Abbiegen lenkt der Fahrer.',
      },
      mapData: {
        title: 'Anbindung echter Kartendaten',
        text: 'Erstellt aus den Spielarchiven, nur lesend, ein spurgenaues Straßennetz und ordnet die Position des Trucks einer Spur zu.',
        note: 'In ATS anhand einer aufgezeichneten Fahrt überprüft. Noch nicht in einem Release.',
      },
      speedAssistant: {
        title: 'Geschwindigkeitsassistent',
        text: 'Folgt dem Tempolimit und arbeitet als Tempomat. Gas und Bremse werden über ein virtuelles Eingabegerät gesteuert.',
        note: 'Noch keine Abstandsregelung.',
      },
      dashboard: {
        title: 'Anwendungs-Dashboard',
        text: 'Live-Anzeige von Geschwindigkeit, Gang, Kraftstoff, AdBlue, Auftrag und Routenfortschritt sowie ein Systemstatus, der genau zeigt, wo die Steuerkette stoppt.',
        note: 'Zeigt nie erfundene Werte.',
      },
      safety: {
        title: 'Sicherheits-Zustandsautomat',
        text: 'Expliziter Start, sofortiges Stoppen per Schaltfläche oder Esc und ein Fehlerzustand bei verlorener oder ungültiger Telemetrie. Die Steuerung wird 0,3 s nach dem Schließen der App freigegeben.',
        note: 'Mit Unit-Tests abgesichert.',
      },
      demoMode: {
        title: 'Demo-Modus',
        text: 'Kein Spiel zur Hand? Ein simulierter Truck reagiert auf die Assistenten, und jeder simulierte Wert ist deutlich als Demo-Daten gekennzeichnet.',
        note: 'Zum Ausprobieren der App.',
      },
      configuration: {
        title: 'Konfiguration und Updates',
        text: 'Oberfläche auf Englisch, Deutsch und Niederländisch, metrische oder imperiale Einheiten und Update-Prüfungen mit kryptografisch signierten Updates.',
        note: 'Einstellungen werden noch nicht zwischen Sitzungen gespeichert.',
      },
      overlay: {
        title: 'Overlay im Spiel',
        text: 'Ein kleines Overlay über dem Spiel zum Starten und Stoppen des Autopiloten, das über einen konfigurierbaren globalen Hotkey ein- und ausgeblendet wird.',
        note: 'In ATS verwendet. Noch nicht in einem Release.',
      },
      distanceKeeping: {
        title: 'Abstandsregelung',
        text: 'Verkehr voraus erkennen und den Geschwindigkeitsassistenten um einen sicheren Abstand erweitern.',
        note: 'Noch nicht begonnen.',
      },
    },
  },

  games: {
    eyebrow: 'Unterstützte Spiele',
    title: 'Kompatibilität',
    intro:
      'RoadPilot ist über ein eigenes Plugin für das offizielle SCS Telemetry und Input SDK mit den Spielen verbunden. Entwicklung und Tests finden derzeit in American Truck Simulator statt.',
    capabilitiesLabel: 'Fähigkeiten',
    items: {
      ats: {
        name: 'American Truck Simulator',
        summary: 'Telemetrie, Steuerung und der Geschwindigkeitsassistent wurden in ATS 1.61 überprüft.',
        capabilities: {
          telemetry: 'Telemetrie und Steuerung',
          speedAssistant: 'Geschwindigkeitsassistent',
          laneKeeping: 'Spurhalten mit Kartendaten',
          units: 'Imperiale Einheiten',
          detection: 'Spielerkennung',
        },
      },
      ets2: {
        name: 'Euro Truck Simulator 2',
        summary:
          'ETS2 nutzt dasselbe SCS SDK, das Plugin ist also dafür gebaut, wurde in ETS2 aber noch nicht überprüft. Kartendaten und Spurhalten gibt es vorerst nur für ATS.',
        capabilities: {
          telemetry: 'Telemetrie und Steuerung',
          speedAssistant: 'Geschwindigkeitsassistent',
          laneKeeping: 'Spurhalten mit Kartendaten',
          units: 'Metrische Einheiten',
          detection: 'Spielerkennung',
        },
      },
    },
  },

  roadmap: {
    eyebrow: 'Roadmap',
    title: 'Entwicklungs-Roadmap',
    intro: 'Die Roadmap wird anhand des überprüften Stands der RoadPilot-Repositories neu aufgebaut.',
    placeholderTitle: 'Roadmap in Arbeit',
    placeholderText:
      'Bis die neue Roadmap veröffentlicht ist, wird hier kein Funktionsstatus angezeigt. Es gibt keine festen Termine: Funktionen erscheinen, wenn sie sicher und getestet sind.',
  },

  download: {
    eyebrow: 'Download',
    title: 'RoadPilot herunterladen',
    intro: 'RoadPilot wurde noch nicht veröffentlicht. Releases sollen auf GitHub bereitgestellt werden.',
    latestRelease: 'Neuestes Release',
    releaseDate: 'Veröffentlicht am',
    releaseStatus: 'Status',
    statusEarly: 'Frühes Release',
    installerSize: 'Größe des Installers',
    platform: 'Plattform',
    platformValue: 'Windows 10 / 11, 64 Bit',
    downloadButton: 'Download für Windows',
    githubRelease: 'GitHub-Release-Seite',
    releaseNotes: 'Release-Hinweise',
    previousVersions: 'Frühere Versionen',
    comingSoonTitle: 'Demnächst',
    comingSoonText:
      'RoadPilot befindet sich noch in Entwicklung und wurde noch nicht veröffentlicht, daher gibt es noch nichts herunterzuladen. Das erste Release wird hier angeboten, sobald es verfügbar ist.',
    noRelease: 'Noch kein Release',
    requirementsTitle: 'Systemanforderungen',
    requirements: [
      'Windows 10 oder 11, 64 Bit',
      'WebView2-Runtime (unter Windows 11 vorinstalliert)',
      'American Truck Simulator oder Euro Truck Simulator 2 mit SDK 1.14 oder neuer für die Steuerung',
      'Das Spiel-Plugin ist noch nicht Teil des Installers und wird separat gebaut',
    ],
    notice: 'RoadPilot befindet sich noch in Entwicklung. Die Anforderungen können sich in künftigen Releases ändern.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Häufig gestellte Fragen',
    items: [
      {
        q: 'Was ist RoadPilot?',
        a: 'RoadPilot ist ein unabhängiges Projekt für Fahrassistenz in Euro Truck Simulator 2 und American Truck Simulator. Es besteht aus einer Windows-Desktop-App und einem Spiel-Plugin, das Telemetrie aus dem Spiel liest und Lenk-, Gas- und Bremseingaben an das Spiel zurücksenden kann.',
      },
      {
        q: 'Ist RoadPilot kostenlos?',
        a: 'Ja. RoadPilot ist kostenlos nutzbar. Es gibt keine Abos und keine kostenpflichtigen Tarife.',
      },
      {
        q: 'Welche Spiele werden unterstützt?',
        a: 'American Truck Simulator ist das Spiel, in dem RoadPilot entwickelt und getestet wird: Telemetrie, Steuerung und der Geschwindigkeitsassistent sind in ATS 1.61 überprüft, und der Spurhalteassistent wird dort entwickelt. Euro Truck Simulator 2 nutzt dasselbe SDK, wurde aber noch nicht überprüft.',
      },
      {
        q: 'Wie installiere ich RoadPilot?',
        a: 'RoadPilot wurde noch nicht veröffentlicht, daher gibt es keinen Installer zum Herunterladen. Sobald ein Release veröffentlicht ist, wird es im Bereich Download angeboten.',
      },
      {
        q: 'Ist RoadPilot Open Source?',
        a: 'Der Quellcode wird in öffentlichen Repositories auf GitHub entwickelt. Die Lizenz ist noch nicht entschieden, daher wird derzeit keine Open-Source-Lizenz gewährt.',
      },
      {
        q: 'Wie kann ich einen Fehler melden?',
        a: 'Bitte melde Fehler über GitHub Issues und gib dein Spiel, die Spielversion und die RoadPilot-Version an.',
      },
      {
        q: 'Wie kann ich mitmachen?',
        a: 'Feedback, Testfahrten, Fehlermeldungen und Code-Beiträge sind über das öffentliche GitHub-Repository willkommen.',
      },
      {
        q: 'Befindet sich RoadPilot noch in Entwicklung?',
        a: 'Ja. RoadPilot steht noch am Anfang. Alle Funktionen sind noch in Entwicklung, und die Roadmap zeigt, woran gearbeitet wird und was geplant ist.',
      },
      {
        q: 'Steht RoadPilot in Verbindung mit SCS Software?',
        a: 'Nein. RoadPilot ist ein unabhängiges Projekt und weder mit SCS Software verbunden noch von SCS Software unterstützt.',
      },
    ],
  },

  community: {
    eyebrow: 'Community',
    title: 'Gestalte RoadPilot mit',
    intro:
      'RoadPilot ist ein Community-orientiertes Projekt. Testfahrten, Fehlermeldungen und Ideen bestimmen, was als Nächstes gebaut wird.',
    repository: { title: 'GitHub-Repository', text: 'Quellcode, Releases und Entwicklungsverlauf.' },
    issues: { title: 'GitHub Issues', text: 'Melde einen Fehler oder ein Problem mit einer bestimmten Spielversion.' },
    discussions: { title: 'GitHub Discussions', text: 'Fragen, Ideen und allgemeiner Austausch.' },
    discussionsDisabled: 'Noch nicht aktiviert',
    contact: { title: 'Kontakt', text: 'Für alles, was nicht zu GitHub passt.' },
    contactMissing: '[[Kontakt-E-Mail-Adresse wird ergänzt]]',
    feedback: {
      title: 'Feedback willkommen',
      text: 'Schon ausprobiert? Sag uns, was funktioniert hat und was nicht. Bitte gib dein Spiel, die Spielversion und die RoadPilot-Version an. Das Diagnoseprotokoll in der App hilft sehr.',
      action: 'Feedback geben',
    },
    open: 'Öffnen',
  },

  footer: {
    description:
      'Ein unabhängiges Projekt für Fahrassistenz in Euro Truck Simulator 2 und American Truck Simulator.',
    navigation: 'Navigation',
    project: 'Projekt',
    githubOrganization: 'GitHub-Organisation',
    legal: 'Rechtliches',
    contact: 'Kontakt',
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
    disclaimer:
      'RoadPilot steht in keiner Verbindung zu SCS Software und wird von SCS Software nicht unterstützt. Euro Truck Simulator 2 und American Truck Simulator sind Marken von SCS Software.',
    copyright: '© {year} RoadPilot',
  },

  legal: {
    draftNotice:
      'Diese Seite ist unvollständig. Hervorgehobene Platzhalter müssen durch bestätigte Angaben ersetzt werden, bevor die Website online geht.',
    imprint: {
      title: 'Impressum',
      lead: 'Angaben gemäß den geltenden gesetzlichen Vorgaben',
      sections: [
        {
          heading: 'Verantwortlich für diese Website',
          address: [legal.name, ...legal.addressLines],
          paragraphs: [],
        },
        {
          heading: 'Über RoadPilot',
          paragraphs: [
            'RoadPilot ist ein privates, nicht kommerzielles Softwareprojekt.',
            'Die Software wird kostenlos bereitgestellt. Das Projekt erzielt keine Einnahmen durch Werbung, Sponsoring oder andere kommerzielle Tätigkeiten.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Stand: 31. Oktober 2026',
      sections: [
        {
          heading: 'Verantwortlicher',
          address: [legal.name, ...legal.addressLines],
          paragraphs: [`E-Mail: ${legal.email}`],
        },
        {
          heading: 'Überblick',
          paragraphs: [
            'Diese Website ist eine statische Website. Sie verwendet keine Cookies, keine Analyse-, Tracking- oder Werbedienste und lädt keine Schriftarten, Skripte oder sonstigen Inhalte von Servern Dritter. Sie speichert keine Daten in deinem Browser. Es gibt keine Formulare und keine Benutzerkonten.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'Die Website wird auf einem von der Hetzner Online GmbH gemieteten Server gehostet. Beim Aufruf der Website übermittelt dein Browser notwendigerweise technische Daten wie deine IP-Adresse an den Server. Diese Daten werden ausschließlich verwendet, um die Website an deinen Browser auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse an der Bereitstellung der Website.',
            'Der Webserver schreibt keine Zugriffsprotokolle. Deine IP-Adresse wird daher nach der Beantwortung deiner Anfrage nicht gespeichert.',
          ],
        },
        {
          heading: 'Kontakt per E-Mail',
          paragraphs: [
            'Wenn du uns per E-Mail kontaktierst, verwenden wir deine E-Mail-Adresse und den Inhalt deiner Nachricht ausschließlich, um deine Anfrage zu beantworten. Die Daten werden nicht an Dritte weitergegeben und gelöscht, sobald sie für diesen Zweck nicht mehr erforderlich sind. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: unser berechtigtes Interesse an der Beantwortung deiner Anfrage.',
          ],
        },
        {
          heading: 'Externe Links',
          paragraphs: [
            'Links zu externen Websites wie GitHub sind gewöhnliche Links. Erst wenn du einen Link anklickst, werden Daten an diese Websites gesendet. Danach gilt die Datenschutzerklärung der jeweiligen Website.',
          ],
        },
        {
          heading: 'Deine Rechte',
          paragraphs: [
            `Nach der DSGVO hast du das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Um diese Rechte auszuüben, schreibe eine E-Mail an ${legal.email}.`,
            'Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem EU-Mitgliedstaat deines gewöhnlichen Aufenthaltsorts, deines Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes (Art. 77 DSGVO).',
          ],
        },
      ],
    },
  },
};
