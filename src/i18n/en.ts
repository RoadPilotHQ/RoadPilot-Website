import { legal } from '../config/legal';

interface ChangelogEntry {
  summary: string;
  added: string[];
  improved: string[];
  fixed: string[];
  limitations: string[];
}

/**
 * All visible website texts (the website is English only).
 * Text in [[double brackets]] is a placeholder and is highlighted on the page
 * until it is replaced with confirmed information.
 */
export const en = {
  meta: {
    homeTitle: 'RoadPilot – Driving assistance for ETS2 and ATS',
    homeDescription:
      'RoadPilot is a free, independent driving assistance project for Euro Truck Simulator 2 and American Truck Simulator, with a native Windows desktop app.',
    imprintTitle: 'Imprint | RoadPilot',
    imprintDescription: 'Legal information and website operator details for RoadPilot.',
    privacyTitle: 'Privacy Policy – RoadPilot',
    privacyDescription: 'Privacy policy of the RoadPilot website.',
  },

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
    roadmap: 'Roadmap',
    changelog: 'Changelog',
    faq: 'FAQ',
    github: 'GitHub',
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
    intro: 'Where RoadPilot stands. There are no fixed dates: features ship when they are safe and tested.',
    stages: {
      completed: 'Completed',
      inProgress: 'In Progress',
      planned: 'Planned',
    },
    items: {
      demoPreview: { title: 'Demo Preview', text: 'Dashboard with live data and a clearly labelled demo mode.' },
      safety: { title: 'Safety logic', text: 'Autopilot state machine, telemetry validation and diagnostics log.' },
      atsIntegration: {
        title: 'ATS integration',
        text: 'Game plugin and virtual input device verified in ATS 1.61, with a guided control test.',
      },
      speedAssistant: { title: 'Speed assistant', text: 'Speed limit and cruise control through throttle and brake.' },
      mapData: { title: 'Map data', text: 'Lane-level road network read from the ATS game archives.' },
      steeringCalibration: {
        title: 'Steering calibration',
        text: 'Steering response of the game measured from recorded drives and modelled.',
      },
      overlay: { title: 'In-game overlay', text: 'Start and stop the autopilot from above the game with a hotkey.' },
      laneKeeping: {
        title: 'Lane keeping assistance',
        text: 'Driven in ATS on motorways and country roads. Being refined before it is released.',
      },
      routeForks: {
        title: 'Following the route at forks',
        text: 'Using the game’s navigation route so lane keeping knows which branch to take.',
      },
      driverOverride: {
        title: 'Driver override',
        text: 'Disengage automatically when the driver brakes or steers.',
      },
      ets2Integration: {
        title: 'ETS2 integration',
        text: 'Verify the plugin in Euro Truck Simulator 2 and add ETS2 map data.',
      },
      junctions: { title: 'Junction turns', text: 'Steering through junction turns, which is still left to the driver.' },
      routePlanning: { title: 'Route planning', text: 'Road graph, route search and upcoming manoeuvres.' },
      distanceKeeping: { title: 'Distance keeping', text: 'Detect traffic ahead and extend the speed assistant.' },
      qualityOfLife: {
        title: 'Quality of life',
        text: 'Persistent settings and the game plugin bundled with the installer.',
      },
    },
  },

  download: {
    eyebrow: 'Download',
    title: 'Get RoadPilot',
    intro: 'RoadPilot will be distributed through GitHub Releases, with automatic checks for signed updates.',
    latestRelease: 'Latest release',
    releaseDate: 'Release date',
    releaseStatus: 'Status',
    statusEarly: 'Early release',
    installerSize: 'Installer size',
    platform: 'Platform',
    platformValue: 'Windows 10 / 11, 64-bit',
    downloadButton: 'Download for Windows',
    githubReleases: 'GitHub Releases',
    releaseNotes: 'Release notes',
    previousVersions: 'Previous versions',
    comingSoonTitle: 'Coming Soon',
    comingSoonText:
      'RoadPilot has not been released yet. The first release will be available for download here.',
    noRelease: 'No release yet',
    checkingRelease: 'Checking for latest release…',
    upcomingStatus: 'In preparation · not published yet',
    upcomingText:
      'RoadPilot {version} is being prepared as the first public demo release. It will be offered here once it is published on GitHub.',
    requirementsTitle: 'System requirements',
    requirements: [
      'Windows 10 or 11, 64-bit',
      'WebView2 runtime (preinstalled on Windows 11)',
      'American Truck Simulator or Euro Truck Simulator 2 with SDK 1.14 or newer for controls',
      'The game plugin is not part of the installer yet and is built separately',
    ],
    notice: 'RoadPilot is still in development. Requirements may change in future releases.',
  },

  changelog: {
    eyebrow: 'Changelog',
    title: 'Release history',
    intro: 'Published releases only. Work in progress is covered by the roadmap.',
    added: 'Added',
    improved: 'Improvements',
    fixed: 'Bug fixes',
    limitations: 'Known limitations',
    empty: 'No release notes are available yet.',
    /** Release notes per version, e.g. '1.1.0': { summary, added, improved, fixed, limitations }. */
    entries: {
      '0.2.0': {
        summary: 'The first public demo preview of RoadPilot for Windows.',
        added: [
          'Dashboard with vehicle readings, autopilot status, route progress, current delivery and assistance controls.',
          'Simulated drive with sample speed, engine, fuel, AdBlue, gear and route values.',
          'Maps page with an illustrative Munich–Salzburg–Linz route and moving demo truck marker.',
          'Jobs page with a sample active delivery and filterable, sortable contract offers.',
          'Signed in-app update checks and installation flow for future releases.',
        ],
        improved: [],
        fixed: [],
        limitations: [
          'Visual demo only: it does not connect to ETS2 or ATS, read game telemetry or control a vehicle.',
          'Windows x64 only.',
          'Version 0.1.0 does not include updater configuration; install 0.2.0 manually once before using in-app updates.',
        ],
      },
    } as Record<string, ChangelogEntry>,
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
        a: 'Download the Windows x64 installer from the Download section or the GitHub release page and run it. Version 0.1.0 builds must be updated to 0.2.0 manually before in-app updates are available.',
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
