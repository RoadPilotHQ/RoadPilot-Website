# RoadPilot-Website

RoadPilot-Website is the planned source of the official RoadPilot website.

> **Status: early planning.** This repository does not contain source code yet. Responsibilities, architecture and roadmap below describe the **planned** scope, not existing functionality.

## Purpose

This repository is meant to hold the public website that introduces RoadPilot, provides downloads and points visitors to documentation and the community.

## Key responsibilities

- Homepage
- Downloads
- Changelog
- Documentation links
- Project information
- Community links
- Privacy and legal information

## Architecture overview

The following structure is a proposal and may change as development starts:

- **Pages**: homepage, project information, downloads and changelog.
- **Links**: documentation (RoadPilot-Docs) and community (Discord).
- **Legal**: privacy policy and legal notice.
- **Hosting**: the hosting and deployment approach has not been chosen yet.

## Integration with the RoadPilot ecosystem

RoadPilot is split into independent repositories. Each one is developed, versioned and released on its own; there is no monorepo and no shared source code.

| Repository | Role |
|---|---|
| [RoadPilot](https://github.com/RoadPilotHQ/RoadPilot) | Main desktop application |
| [RoadPilot-Map](https://github.com/RoadPilotHQ/RoadPilot-Map) | Map processing and geographic data |
| [RoadPilot-Language](https://github.com/RoadPilotHQ/RoadPilot-Language) | Translations and localization |
| [RoadPilot-Visualization](https://github.com/RoadPilotHQ/RoadPilot-Visualization) | Visualization components and development tools |
| [RoadPilot-Plugin](https://github.com/RoadPilotHQ/RoadPilot-Plugin) | Plugin architecture and SDK |
| **RoadPilot-Website** (this repository) | Official website |
| [RoadPilot-Discord](https://github.com/RoadPilotHQ/RoadPilot-Discord) | Discord community infrastructure |
| [RoadPilot-Docs](https://github.com/RoadPilotHQ/RoadPilot-Docs) | Central documentation |

The website is expected to link to RoadPilot releases, to RoadPilot-Docs for documentation and to the community served by RoadPilot-Discord. It does not share code with other repositories.

## Development status

| Area | Status |
|---|---|
| Source code | Not started |
| Architecture | In planning |
| Releases | None |

## Planned roadmap

Planned work, in no fixed order and without dates:

- [ ] Choose the site technology and hosting
- [ ] Design the site structure
- [ ] Write the homepage and project information
- [ ] Add the downloads and changelog pages
- [ ] Add the privacy and legal pages
- [ ] Set up deployment

## Contributing

RoadPilot is at an early stage and the contribution process is still being defined. Shared guidelines are planned in [RoadPilot-Docs](https://github.com/RoadPilotHQ/RoadPilot-Docs).

Until then, please open an issue before starting any work, so it can be coordinated. All contributions, issues and documentation must be written in English.

## License

Licensing is currently undecided. No license has been selected for this repository yet. Until a license is published here, no permission is granted to use, copy, modify or distribute its contents beyond what the GitHub Terms of Service allow.

---

Euro Truck Simulator 2 and American Truck Simulator are trademarks of SCS Software. RoadPilot is not an official SCS Software product.
