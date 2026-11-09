import { legal } from '../config/legal';

/**
 * All visible website texts in English, the default language. de.ts and nl.ts must have exactly
 * the same structure (enforced by the Messages type).
 * Text in [[double brackets]] is a placeholder and is highlighted on the page
 * until it is replaced with confirmed information.
 */
export const en = {
  common: {
    skipToContent: 'Skip to content',
    comingSoon: 'Coming soon',
    notPublicYet: 'The GitHub repository is not public yet.',
    opensInNewTab: '(opens in a new tab)',
    backToHome: 'Back to the homepage',
  },

  status: {
    available: 'Available',
    demo: 'Demo Preview',
    experimental: 'Experimental',
    inDevelopment: 'In Development',
    planned: 'Planned',
  },

  nav: {
    label: 'Main navigation',
    home: 'Home',
    features: 'Features',
    demo: 'Demo',
    roadmap: 'Roadmap',
    faq: 'FAQ',
    github: 'GitHub',
    language: 'Language',
    download: 'Download',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  hero: {
    eyebrow: 'For Euro Truck Simulator 2 and American Truck Simulator',
    title: 'Your truck. Your road. Your control.',
    text: 'RoadPilot is an intelligent driving assistance project for Euro Truck Simulator 2 and American Truck Simulator.',
    download: 'Download',
    github: 'GitHub',
    compatibility: 'Windows 10 and 11 (64-bit) · Free to use · Early development',
  },

  principles: {
    label: 'Project principles',
    items: [
      { title: 'Honest data', text: 'Missing data is shown as missing. Simulated values are always marked as demo data.' },
      { title: 'Safety first', text: 'RoadPilot only drives when you start it, and stops on any doubt.' },
      { title: 'Lightweight', text: 'A native Windows app written in Rust, small and fast.' },
      { title: 'Free', text: 'RoadPilot is free to use. No subscriptions, no paid tiers.' },
    ],
  },

  features: {
    eyebrow: 'Features',
    title: 'What RoadPilot can do today, and what comes next',
    intro:
      'RoadPilot is in active development. Every feature below is still being built and tested, and may change before it is finished.',
    items: {
      laneKeeping: {
        title: 'Lane Keeping Assistance',
        text: 'Keeps the truck centred in its lane using lane data from the game’s map files, typically within 0.1–0.3 m of the lane centre.',
        note: 'ATS only. Not yet in a release. The driver steers at forks, exits and junction turns.',
      },
      mapData: {
        title: 'Real Map Data Integration',
        text: 'Builds a lane-level road network from the game archives, read-only, and matches the truck position to a lane.',
        note: 'Verified in ATS against a recorded drive. Not yet in a release.',
      },
      speedAssistant: {
        title: 'Speed Assistant',
        text: 'Follows the speed limit and works as cruise control, controlling throttle and brake through a virtual input device.',
        note: 'No distance keeping yet.',
      },
      dashboard: {
        title: 'Application Dashboard',
        text: 'Live speed, gear, fuel, AdBlue, job and route progress, plus a system status that shows exactly where the control chain stops.',
        note: 'Never shows invented values.',
      },
      safety: {
        title: 'Safety State Machine',
        text: 'Explicit start, immediate stop with a button or Esc, and a fault state on lost or invalid telemetry. Controls are released after 0.3 s if the app closes.',
        note: 'Unit-tested.',
      },
      demoMode: {
        title: 'Demo Mode',
        text: 'No game at hand? A simulated truck reacts to the assistants, and every simulated value is clearly labelled as demo data.',
        note: 'For trying out the app.',
      },
      configuration: {
        title: 'Configuration and Updates',
        text: 'Interface in English, German and Dutch, metric or imperial units, and update checks with cryptographically signed updates.',
        note: 'Settings are not saved between sessions yet.',
      },
      overlay: {
        title: 'In-Game Overlay',
        text: 'A small overlay above the game to start and stop the autopilot, shown and hidden with a configurable global hotkey.',
        note: 'Used in ATS. Not yet in a release.',
      },
      distanceKeeping: {
        title: 'Distance Keeping',
        text: 'Detect traffic ahead and extend the speed assistant to keep a safe distance.',
        note: 'Not started yet.',
      },
    },
  },

  demo: {
    eyebrow: 'Try it',
    title: 'Interactive demo',
    intro:
      'See how the assistant behaves, right in your browser. Nothing here comes from a game: the truck, the road and every value are simulated, and no data leaves your device.',
    badge: 'Demo data – simulated',
    panelLabel: 'Simulated RoadPilot dashboard',
    status: 'Assistant',
    modes: { off: 'Off', active: 'Active', fault: 'Fault' },
    speed: 'Speed',
    limit: 'Speed limit',
    gear: 'Gear',
    neutral: 'N',
    laneOffset: 'Distance from lane centre',
    distance: 'Distance driven',
    unknown: '—',
    unitsLabel: 'Units',
    metric: 'Metric',
    imperial: 'Imperial',
    units: { metric: { speed: 'km/h', distance: 'km', offset: 'm' }, imperial: { speed: 'mph', distance: 'mi', offset: 'ft' } },
    start: 'Start assistant',
    stop: 'Stop assistant',
    fault: 'Simulate telemetry loss',
    recover: 'Clear fault',
    stopHint: 'Press Esc at any time to stop.',
    offNote: 'The assistant is off. The truck slows down on its own and drifts in its lane because nobody steers.',
    activeNote: 'The assistant follows the speed limit and keeps the truck near the lane centre.',
    faultNote: 'Telemetry lost. The assistant has released all controls and shows no values instead of guessing.',
    roadLabel: 'Simulated road with speed limit signs',
    disclaimer:
      'This demo only illustrates the idea. The real application needs the game, its plugin and map data, and is still in development.',
  },

  games: {
    eyebrow: 'Supported games',
    title: 'Compatibility',
    intro:
      'RoadPilot connects to the games through its own plugin for the official SCS Telemetry and Input SDK. Development and testing currently happen in American Truck Simulator.',
    capabilitiesLabel: 'Capabilities',
    items: {
      ats: {
        name: 'American Truck Simulator',
        summary: 'Telemetry, controls and the speed assistant have been verified in ATS 1.61.',
        capabilities: {
          telemetry: 'Telemetry and controls',
          speedAssistant: 'Speed assistant',
          laneKeeping: 'Lane keeping with map data',
          units: 'Imperial units',
          detection: 'Game detection',
        },
      },
      ets2: {
        name: 'Euro Truck Simulator 2',
        summary:
          'ETS2 uses the same SCS SDK, so the plugin is built for it, but it has not been verified in ETS2 yet. Map data and lane keeping are ATS only for now.',
        capabilities: {
          telemetry: 'Telemetry and controls',
          speedAssistant: 'Speed assistant',
          laneKeeping: 'Lane keeping with map data',
          units: 'Metric units',
          detection: 'Game detection',
        },
      },
    },
  },

  roadmap: {
    eyebrow: 'Roadmap',
    title: 'Development roadmap',
    intro: 'The roadmap is being rebuilt from the verified status of the RoadPilot repositories.',
    placeholderTitle: 'Roadmap in progress',
    placeholderText:
      'Until the new roadmap is published, no feature status is shown here. There are no fixed dates: features are released when they are safe and tested.',
  },

  download: {
    eyebrow: 'Download',
    title: 'Get RoadPilot',
    intro: 'RoadPilot has not been released yet. Releases are planned to be published on GitHub.',
    latestRelease: 'Latest release',
    releaseDate: 'Release date',
    releaseStatus: 'Status',
    statusEarly: 'Early release',
    installerSize: 'Installer size',
    platform: 'Platform',
    platformValue: 'Windows 10 / 11, 64-bit',
    downloadButton: 'Download for Windows',
    githubRelease: 'GitHub release page',
    releaseNotes: 'Release notes',
    previousVersions: 'Previous versions',
    comingSoonTitle: 'Coming Soon',
    comingSoonText:
      'RoadPilot is still under development and has not been released yet, so there is nothing to download. The first release will be offered here once it is available.',
    noRelease: 'No release yet',
    requirementsTitle: 'System requirements',
    requirements: [
      'Windows 10 or 11, 64-bit',
      'WebView2 runtime (preinstalled on Windows 11)',
      'American Truck Simulator or Euro Truck Simulator 2 with SDK 1.14 or newer for controls',
      'The game plugin is not part of the installer yet and is built separately',
    ],
    notice: 'RoadPilot is still in development. Requirements may change in future releases.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      {
        q: 'What is RoadPilot?',
        a: 'RoadPilot is an independent driving assistance project for Euro Truck Simulator 2 and American Truck Simulator. It consists of a Windows desktop app and a game plugin that reads telemetry from the game and can send steering, throttle and brake inputs back to it.',
      },
      {
        q: 'Is RoadPilot free?',
        a: 'Yes. RoadPilot is free to use. There are no subscriptions and no paid plans.',
      },
      {
        q: 'Which games are supported?',
        a: 'American Truck Simulator is the game RoadPilot is developed and tested in: telemetry, controls and the speed assistant are verified in ATS 1.61, and lane keeping is being developed there. Euro Truck Simulator 2 uses the same SDK but has not been verified yet.',
      },
      {
        q: 'How do I install RoadPilot?',
        a: 'RoadPilot has not been released yet, so there is no installer to download. Once a release is published, it will be offered in the Download section.',
      },
      {
        q: 'Is RoadPilot open source?',
        a: 'The source code is developed in public repositories on GitHub. The licence has not been decided yet, so no open-source licence is granted for now.',
      },
      {
        q: 'How can I report a bug?',
        a: 'Please report bugs through GitHub Issues, including your game, game version and RoadPilot version.',
      },
      {
        q: 'How can I contribute?',
        a: 'Feedback, test drives, bug reports and code contributions are welcome through the public GitHub repository.',
      },
      {
        q: 'Is RoadPilot still in development?',
        a: 'Yes. RoadPilot is at an early stage. All features are still in development, and the roadmap shows what is being worked on and what is planned.',
      },
      {
        q: 'Is RoadPilot affiliated with SCS Software?',
        a: 'No. RoadPilot is an independent project and is not affiliated with or endorsed by SCS Software.',
      },
    ],
  },

  community: {
    eyebrow: 'Community',
    title: 'Build RoadPilot with us',
    intro:
      'RoadPilot is a community-oriented project. Test drives, bug reports and ideas shape what gets built next.',
    repository: { title: 'GitHub repository', text: 'Source code, releases and development history.' },
    issues: { title: 'GitHub Issues', text: 'Report a bug or a problem with a specific game version.' },
    discussions: { title: 'GitHub Discussions', text: 'Questions, ideas and general conversation.' },
    discussionsDisabled: 'Not enabled yet',
    contact: { title: 'Contact', text: 'For anything that does not fit into GitHub.' },
    contactMissing: '[[Contact email address to be added]]',
    feedback: {
      title: 'Feedback welcome',
      text: 'Tried RoadPilot? Tell us what worked and what did not. Please include your game, game version and RoadPilot version. The diagnostics log in the app helps a lot.',
      action: 'Give feedback',
    },
    open: 'Open',
  },

  footer: {
    description:
      'An independent driving assistance project for Euro Truck Simulator 2 and American Truck Simulator.',
    navigation: 'Navigation',
    project: 'Project',
    githubOrganization: 'GitHub organization',
    legal: 'Legal',
    contact: 'Contact',
    imprint: 'Imprint',
    privacy: 'Privacy Policy',
    disclaimer:
      'RoadPilot is not affiliated with or endorsed by SCS Software. Euro Truck Simulator 2 and American Truck Simulator are trademarks of SCS Software.',
    copyright: '© {year} RoadPilot',
  },

  legal: {
    draftNotice:
      'This page is incomplete. Highlighted placeholders must be replaced with confirmed information before the website goes live.',
    imprint: {
      title: 'Imprint',
      lead: 'Information according to applicable legal requirements',
      sections: [
        {
          heading: 'Responsible for this website',
          address: [legal.name, ...legal.addressLines],
          paragraphs: [],
        },
        {
          heading: 'About RoadPilot',
          paragraphs: [
            'RoadPilot is a private, non-commercial software project.',
            'The software is provided free of charge. The project does not generate revenue through advertising, sponsorships or other commercial activities.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: 31 October 2026',
      sections: [
        {
          heading: 'Controller',
          address: [legal.name, ...legal.addressLines],
          paragraphs: [`Email: ${legal.email}`],
        },
        {
          heading: 'Overview',
          paragraphs: [
            'This website is a static website. It does not use cookies, analytics, tracking or advertising, and it does not load fonts, scripts or other content from third-party servers. It does not store any data in your browser. There are no forms or user accounts.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'The website is hosted on a server rented from Hetzner Online GmbH. When you open the website, your browser necessarily transmits technical data such as your IP address to the server. This data is used only to deliver the website to your browser. The legal basis is Art. 6 (1) (f) GDPR: our legitimate interest in providing the website.',
            'The web server does not write access logs. Your IP address is therefore not stored after your request has been answered.',
          ],
        },
        {
          heading: 'Contact by email',
          paragraphs: [
            'If you contact us by email, we use your email address and the content of your message only to answer your request. The data is not passed on to third parties and is deleted once it is no longer needed for this purpose. The legal basis is Art. 6 (1) (f) GDPR: our legitimate interest in answering your request.',
          ],
        },
        {
          heading: 'External links',
          paragraphs: [
            'Links to external websites such as GitHub are ordinary links. No data is sent to these websites until you click a link. After that, the privacy policy of the respective website applies.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            `Under the GDPR you have the right of access, rectification, erasure, restriction of processing, data portability and objection. To exercise these rights, email ${legal.email}.`,
            'You also have the right to lodge a complaint with a data protection supervisory authority, in particular in the EU member state of your habitual residence, your place of work or the place of the alleged infringement (Art. 77 GDPR).',
          ],
        },
      ],
    },
  },
};

export type Messages = typeof en;
