import { legal } from '../config/legal';
import type { Messages } from './en';

/**
 * Alle zichtbare websiteteksten in het Nederlands. De structuur moet exact overeenkomen met en.ts.
 * Termen: autonoom rijden, rijstrookassistent, rijassistentie, game-integratie, voertuigtelemetrie,
 * release en download. Product- en repositorynamen worden niet vertaald.
 * Tekst tussen [[dubbele vierkante haken]] is een tijdelijke aanduiding en wordt op de pagina gemarkeerd.
 */
export const nl: Messages = {
  common: {
    skipToContent: 'Direct naar de inhoud',
    comingSoon: 'Binnenkort',
    notPublicYet: 'De GitHub-repository is nog niet openbaar.',
    opensInNewTab: '(opent in een nieuw tabblad)',
    backToHome: 'Terug naar de startpagina',
  },

  status: {
    available: 'Beschikbaar',
    demo: 'Demopreview',
    experimental: 'Experimenteel',
    inDevelopment: 'In ontwikkeling',
    planned: 'Gepland',
  },

  nav: {
    label: 'Hoofdnavigatie',
    home: 'Startpagina',
    features: 'Functies',
    demo: 'Demo',
    roadmap: 'Roadmap',
    faq: 'FAQ',
    github: 'GitHub',
    language: 'Taal',
    download: 'Download',
    openMenu: 'Menu openen',
    closeMenu: 'Menu sluiten',
  },

  hero: {
    eyebrow: 'Voor Euro Truck Simulator 2 en American Truck Simulator',
    title: 'Jouw truck. Jouw weg. Jouw controle.',
    text: 'RoadPilot is een intelligent project voor rijassistentie in Euro Truck Simulator 2 en American Truck Simulator.',
    download: 'Download',
    github: 'GitHub',
    compatibility: 'Windows 10 en 11 (64-bit) · Gratis · Vroege ontwikkeling',
  },

  principles: {
    label: 'Projectprincipes',
    items: [
      { title: 'Eerlijke gegevens', text: 'Ontbrekende gegevens worden als ontbrekend getoond. Gesimuleerde waarden zijn altijd gemarkeerd als demogegevens.' },
      { title: 'Veiligheid eerst', text: 'RoadPilot rijdt alleen wanneer jij het start en stopt bij elke twijfel.' },
      { title: 'Lichtgewicht', text: 'Een native Windows-app, geschreven in Rust: klein en snel.' },
      { title: 'Gratis', text: 'RoadPilot is gratis te gebruiken. Geen abonnementen, geen betaalde varianten.' },
    ],
  },

  features: {
    eyebrow: 'Functies',
    title: 'Wat RoadPilot nu kan en wat er nog komt',
    intro:
      'RoadPilot wordt actief ontwikkeld. Elke functie hieronder wordt nog gebouwd en getest en kan veranderen voordat ze af is.',
    items: {
      laneKeeping: {
        title: 'Rijstrookassistent',
        text: 'Houdt de truck midden in de rijstrook met behulp van rijstrookgegevens uit de kaartbestanden van de game, meestal binnen 0,1–0,3 m van het midden van de rijstrook.',
        note: 'Alleen ATS. Nog niet in een release. Bij splitsingen, afritten en afslaan stuurt de bestuurder.',
      },
      mapData: {
        title: 'Integratie van echte kaartgegevens',
        text: 'Bouwt uit de gamearchieven, alleen lezend, een rijstrookgetrouw wegennet en koppelt de positie van de truck aan een rijstrook.',
        note: 'In ATS gecontroleerd aan de hand van een opgenomen rit. Nog niet in een release.',
      },
      speedAssistant: {
        title: 'Snelheidsassistent',
        text: 'Volgt de maximumsnelheid en werkt als cruisecontrol. Gas en rem worden bediend via een virtueel invoerapparaat.',
        note: 'Nog geen afstandsregeling.',
      },
      dashboard: {
        title: 'Applicatiedashboard',
        text: 'Live weergave van snelheid, versnelling, brandstof, AdBlue, opdracht en routevoortgang, plus een systeemstatus die precies laat zien waar de besturingsketen stopt.',
        note: 'Toont nooit verzonnen waarden.',
      },
      safety: {
        title: 'Veiligheidstoestandsmachine',
        text: 'Expliciete start, direct stoppen met een knop of Esc en een storingstoestand bij verloren of ongeldige telemetrie. De besturing wordt 0,3 s nadat de app sluit vrijgegeven.',
        note: 'Gedekt door unittests.',
      },
      demoMode: {
        title: 'Demomodus',
        text: 'Geen game bij de hand? Een gesimuleerde truck reageert op de assistenten en elke gesimuleerde waarde is duidelijk gemarkeerd als demogegevens.',
        note: 'Om de app uit te proberen.',
      },
      configuration: {
        title: 'Configuratie en updates',
        text: 'Interface in het Engels, Duits en Nederlands, metrische of imperiale eenheden en updatecontroles met cryptografisch ondertekende updates.',
        note: 'Instellingen worden nog niet tussen sessies bewaard.',
      },
      overlay: {
        title: 'Overlay in de game',
        text: 'Een kleine overlay boven de game om de autopiloot te starten en te stoppen, weergegeven en verborgen met een instelbare globale sneltoets.',
        note: 'Gebruikt in ATS. Nog niet in een release.',
      },
      distanceKeeping: {
        title: 'Afstand houden',
        text: 'Verkeer voor je herkennen en de snelheidsassistent uitbreiden om een veilige afstand te bewaren.',
        note: 'Nog niet gestart.',
      },
    },
  },

  demo: {
    eyebrow: 'Probeer het',
    title: 'Interactieve demo',
    intro:
      'Zie direct in je browser hoe de assistent zich gedraagt. Niets hier komt uit een game: de vrachtwagen, de weg en alle waarden zijn gesimuleerd, en er verlaten geen gegevens je apparaat.',
    badge: 'Demogegevens – gesimuleerd',
    panelLabel: 'Gesimuleerd RoadPilot-dashboard',
    status: 'Assistent',
    modes: { off: 'Uit', active: 'Actief', fault: 'Storing' },
    speed: 'Snelheid',
    limit: 'Maximumsnelheid',
    gear: 'Versnelling',
    neutral: 'N',
    laneOffset: 'Afstand tot het midden van de rijstrook',
    distance: 'Afgelegde afstand',
    unknown: '—',
    unitsLabel: 'Eenheden',
    metric: 'Metrisch',
    imperial: 'Imperiaal',
    units: { metric: { speed: 'km/h', distance: 'km', offset: 'm' }, imperial: { speed: 'mph', distance: 'mi', offset: 'ft' } },
    start: 'Assistent starten',
    stop: 'Assistent stoppen',
    fault: 'Telemetrieverlies simuleren',
    recover: 'Storing opheffen',
    stopHint: 'Druk op Esc om op elk moment te stoppen.',
    offNote: 'De assistent is uit. De vrachtwagen vertraagt vanzelf en drijft in zijn rijstrook af omdat niemand stuurt.',
    activeNote: 'De assistent houdt zich aan de maximumsnelheid en houdt de vrachtwagen dicht bij het midden van de rijstrook.',
    faultNote: 'Telemetrie verloren. De assistent heeft alle bediening losgelaten en toont geen waarden in plaats van te gokken.',
    roadLabel: 'Gesimuleerde weg met snelheidsborden',
    disclaimer:
      'Deze demo illustreert alleen het idee. De echte applicatie heeft de game, de plugin en kaartgegevens nodig en is nog in ontwikkeling.',
  },

  games: {
    eyebrow: 'Ondersteunde games',
    title: 'Compatibiliteit',
    intro:
      'RoadPilot maakt via een eigen plug-in voor de officiële SCS Telemetry en Input SDK verbinding met de games. Ontwikkeling en tests vinden op dit moment plaats in American Truck Simulator.',
    capabilitiesLabel: 'Mogelijkheden',
    items: {
      ats: {
        name: 'American Truck Simulator',
        summary: 'Telemetrie, besturing en de snelheidsassistent zijn gecontroleerd in ATS 1.61.',
        capabilities: {
          telemetry: 'Telemetrie en besturing',
          speedAssistant: 'Snelheidsassistent',
          laneKeeping: 'Rijstrookassistent met kaartgegevens',
          units: 'Imperiale eenheden',
          detection: 'Gamedetectie',
        },
      },
      ets2: {
        name: 'Euro Truck Simulator 2',
        summary:
          'ETS2 gebruikt dezelfde SCS SDK, dus de plug-in is ervoor gebouwd, maar is nog niet gecontroleerd in ETS2. Kaartgegevens en de rijstrookassistent zijn voorlopig alleen voor ATS.',
        capabilities: {
          telemetry: 'Telemetrie en besturing',
          speedAssistant: 'Snelheidsassistent',
          laneKeeping: 'Rijstrookassistent met kaartgegevens',
          units: 'Metrische eenheden',
          detection: 'Gamedetectie',
        },
      },
    },
  },

  roadmap: {
    eyebrow: 'Roadmap',
    title: 'Ontwikkelroadmap',
    intro: 'De roadmap wordt opnieuw opgebouwd op basis van de gecontroleerde stand van de RoadPilot-repositories.',
    placeholderTitle: 'Roadmap in uitvoering',
    placeholderText:
      'Zolang de nieuwe roadmap niet is gepubliceerd, wordt hier geen functiestatus getoond. Er zijn geen vaste data: functies verschijnen wanneer ze veilig en getest zijn.',
  },

  download: {
    eyebrow: 'Download',
    title: 'RoadPilot downloaden',
    intro: 'RoadPilot is nog niet uitgebracht. Releases worden naar verwachting op GitHub gepubliceerd.',
    latestRelease: 'Nieuwste release',
    releaseDate: 'Releasedatum',
    releaseStatus: 'Status',
    statusEarly: 'Vroege release',
    installerSize: 'Grootte van het installatieprogramma',
    platform: 'Platform',
    platformValue: 'Windows 10 / 11, 64-bit',
    downloadButton: 'Download voor Windows',
    githubRelease: 'GitHub-releasepagina',
    releaseNotes: 'Releasenotities',
    previousVersions: 'Eerdere versies',
    comingSoonTitle: 'Binnenkort',
    comingSoonText:
      'RoadPilot is nog in ontwikkeling en is nog niet uitgebracht, dus er is nog niets te downloaden. De eerste release wordt hier aangeboden zodra die beschikbaar is.',
    noRelease: 'Nog geen release',
    requirementsTitle: 'Systeemvereisten',
    requirements: [
      'Windows 10 of 11, 64-bit',
      'WebView2-runtime (vooraf geïnstalleerd op Windows 11)',
      'American Truck Simulator of Euro Truck Simulator 2 met SDK 1.14 of nieuwer voor de besturing',
      'De game-plug-in maakt nog geen deel uit van het installatieprogramma en wordt apart gebouwd',
    ],
    notice: 'RoadPilot is nog in ontwikkeling. De vereisten kunnen in toekomstige releases veranderen.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Veelgestelde vragen',
    items: [
      {
        q: 'Wat is RoadPilot?',
        a: 'RoadPilot is een onafhankelijk project voor rijassistentie in Euro Truck Simulator 2 en American Truck Simulator. Het bestaat uit een Windows-desktopapp en een game-plug-in die telemetrie uit de game leest en stuur-, gas- en remcommando’s terug kan sturen.',
      },
      {
        q: 'Is RoadPilot gratis?',
        a: 'Ja. RoadPilot is gratis te gebruiken. Er zijn geen abonnementen en geen betaalde varianten.',
      },
      {
        q: 'Welke games worden ondersteund?',
        a: 'American Truck Simulator is de game waarin RoadPilot wordt ontwikkeld en getest: telemetrie, besturing en de snelheidsassistent zijn gecontroleerd in ATS 1.61 en de rijstrookassistent wordt daar ontwikkeld. Euro Truck Simulator 2 gebruikt dezelfde SDK, maar is nog niet gecontroleerd.',
      },
      {
        q: 'Hoe installeer ik RoadPilot?',
        a: 'RoadPilot is nog niet uitgebracht, dus er is geen installatieprogramma om te downloaden. Zodra er een release is gepubliceerd, wordt die aangeboden in het gedeelte Download.',
      },
      {
        q: 'Is RoadPilot open source?',
        a: 'De broncode wordt ontwikkeld in openbare repositories op GitHub. De licentie is nog niet bepaald, dus er wordt voorlopig geen open-sourcelicentie verleend.',
      },
      {
        q: 'Hoe meld ik een fout?',
        a: 'Meld fouten via GitHub Issues en vermeld je game, de gameversie en de RoadPilot-versie.',
      },
      {
        q: 'Hoe kan ik bijdragen?',
        a: 'Feedback, testritten, foutmeldingen en codebijdragen zijn welkom via de openbare GitHub-repository.',
      },
      {
        q: 'Is RoadPilot nog in ontwikkeling?',
        a: 'Ja. RoadPilot staat nog aan het begin. Alle functies zijn nog in ontwikkeling en de roadmap laat zien waaraan wordt gewerkt en wat gepland is.',
      },
      {
        q: 'Is RoadPilot verbonden met SCS Software?',
        a: 'Nee. RoadPilot is een onafhankelijk project en is niet verbonden met of goedgekeurd door SCS Software.',
      },
    ],
  },

  community: {
    eyebrow: 'Community',
    title: 'Bouw mee aan RoadPilot',
    intro:
      'RoadPilot is een communitygericht project. Testritten, foutmeldingen en ideeën bepalen wat er hierna gebouwd wordt.',
    repository: { title: 'GitHub-repository', text: 'Broncode, releases en ontwikkelgeschiedenis.' },
    issues: { title: 'GitHub Issues', text: 'Meld een fout of een probleem met een bepaalde gameversie.' },
    discussions: { title: 'GitHub Discussions', text: 'Vragen, ideeën en algemeen gesprek.' },
    discussionsDisabled: 'Nog niet ingeschakeld',
    contact: { title: 'Contact', text: 'Voor alles wat niet bij GitHub past.' },
    contactMissing: '[[Contact-e-mailadres wordt toegevoegd]]',
    feedback: {
      title: 'Feedback welkom',
      text: 'RoadPilot geprobeerd? Vertel ons wat werkte en wat niet. Vermeld je game, de gameversie en de RoadPilot-versie. Het diagnoselogboek in de app helpt enorm.',
      action: 'Feedback geven',
    },
    open: 'Openen',
  },

  footer: {
    description:
      'Een onafhankelijk project voor rijassistentie in Euro Truck Simulator 2 en American Truck Simulator.',
    navigation: 'Navigatie',
    project: 'Project',
    githubOrganization: 'GitHub-organisatie',
    legal: 'Juridisch',
    contact: 'Contact',
    imprint: 'Colofon',
    privacy: 'Privacyverklaring',
    disclaimer:
      'RoadPilot is niet verbonden met of goedgekeurd door SCS Software. Euro Truck Simulator 2 en American Truck Simulator zijn handelsmerken van SCS Software.',
    copyright: '© {year} RoadPilot',
  },

  legal: {
    draftNotice:
      'Deze pagina is onvolledig. Gemarkeerde tijdelijke aanduidingen moeten door bevestigde gegevens worden vervangen voordat de website live gaat.',
    imprint: {
      title: 'Colofon',
      lead: 'Gegevens volgens de geldende wettelijke vereisten',
      sections: [
        {
          heading: 'Verantwoordelijk voor deze website',
          address: [legal.name, ...legal.addressLines],
          paragraphs: [],
        },
        {
          heading: 'Over RoadPilot',
          paragraphs: [
            'RoadPilot is een privé, niet-commercieel softwareproject.',
            'De software wordt gratis aangeboden. Het project genereert geen inkomsten uit advertenties, sponsoring of andere commerciële activiteiten.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacyverklaring',
      lastUpdated: 'Laatst bijgewerkt: 31 oktober 2026',
      sections: [
        {
          heading: 'Verwerkingsverantwoordelijke',
          address: [legal.name, ...legal.addressLines],
          paragraphs: [`E-mail: ${legal.email}`],
        },
        {
          heading: 'Overzicht',
          paragraphs: [
            'Deze website is een statische website. Ze gebruikt geen cookies, analyse-, tracking- of advertentiediensten en laadt geen lettertypen, scripts of andere inhoud van servers van derden. Ze slaat geen gegevens op in je browser. Er zijn geen formulieren en geen gebruikersaccounts.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'De website wordt gehost op een server die wordt gehuurd van Hetzner Online GmbH. Wanneer je de website opent, stuurt je browser noodzakelijkerwijs technische gegevens zoals je IP-adres naar de server. Deze gegevens worden alleen gebruikt om de website aan je browser te leveren. De rechtsgrondslag is artikel 6, lid 1, onder f AVG: ons gerechtvaardigd belang bij het aanbieden van de website.',
            'De webserver schrijft geen toegangslogboeken. Je IP-adres wordt daarom niet opgeslagen nadat je verzoek is beantwoord.',
          ],
        },
        {
          heading: 'Contact per e-mail',
          paragraphs: [
            'Als je per e-mail contact met ons opneemt, gebruiken we je e-mailadres en de inhoud van je bericht alleen om je verzoek te beantwoorden. De gegevens worden niet aan derden doorgegeven en verwijderd zodra ze daarvoor niet meer nodig zijn. De rechtsgrondslag is artikel 6, lid 1, onder f AVG: ons gerechtvaardigd belang bij het beantwoorden van je verzoek.',
          ],
        },
        {
          heading: 'Externe links',
          paragraphs: [
            'Links naar externe websites zoals GitHub zijn gewone links. Pas wanneer je op een link klikt, worden gegevens naar die websites gestuurd. Daarna geldt de privacyverklaring van de betreffende website.',
          ],
        },
        {
          heading: 'Jouw rechten',
          paragraphs: [
            `Op grond van de AVG heb je recht op inzage, rectificatie, verwijdering, beperking van de verwerking, gegevensoverdraagbaarheid en bezwaar. Om deze rechten uit te oefenen, stuur je een e-mail naar ${legal.email}.`,
            'Je hebt ook het recht om een klacht in te dienen bij een toezichthoudende autoriteit voor gegevensbescherming, met name in de EU-lidstaat van je gewone verblijfplaats, je werkplek of de plaats van de vermeende inbreuk (artikel 77 AVG).',
          ],
        },
      ],
    },
  },
};
