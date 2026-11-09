# Deployment readiness

Assessment date: 2026-11-09

This document records what is verified in this repository and the remaining
information needed to select and operate a deployment target. It does not
configure a provider or authorize a deployment.

## Verified repository facts

- The site is a static React, TypeScript and Vite website. It has no server
  runtime or backend requirement after the build.
- `npm run build` writes the production site to `dist/`.
- The multi-page build emits nine real HTML documents: the home, imprint and
  privacy pages in English, German and Dutch. Their paths are `/`, `/de/`,
  `/nl/`, `/imprint/`, `/de/imprint/`, `/nl/imprint/`, `/privacy/`,
  `/de/privacy/` and `/nl/privacy/`. These routes need ordinary static-file
  serving; they do not need SPA history fallback rules.
- Every HTML page has a language-specific canonical URL and reciprocal
  `en`, `de`, `nl` and `x-default` alternates. The generated sitemap lists all
  nine pages and matching alternates. `public/robots.txt` allows crawling and
  points to `https://roadpilot.cc/sitemap.xml`.
- The i18n tests inspect those route, canonical, alternate and sitemap rules.
  They pass in the current checkout.
- The production build requires valid operator legal details. The default
  `config/legal.local.json` is ignored by Git; the committed example is not
  accepted for production. The build injects the validated details into the
  imprint and privacy page output, so the finished artifact contains personal
  legal information even though the local JSON file itself is not copied into
  `dist/`.
- The site has no application secrets or runtime credentials. Do not place
  legal details, credentials or private deployment configuration in Git, CI
  logs, public build artifacts, or broadly accessible artifact storage before
  the site is intentionally public.
- The repository contains no provider configuration, container setup,
  deployment workflow, server config, or deployment runbook. The README says
  deployment scripts and server details are configured outside this repo.
- The repository's Git workflow and configured checks are present and were
  clean at the time of this assessment.

## Current public endpoint observation

A read-only check on 2026-11-09 resolved `roadpilot.cc` to an A record and
received HTTP 200 over HTTPS from `https://roadpilot.cc/`. This confirms that
the domain currently resolves and an HTTPS endpoint responds. It does not
identify the hosting provider, origin server, deployment owner, current DNS
configuration, certificate renewal process, or whether this repository's
current build is what that endpoint serves. Those details need to be confirmed
by the site operator before a deployment plan is selected.

The repository text mentions Hetzner in its privacy notice. That is a legal
content statement, not operational evidence for a current server. No current
Debian, Docker, IP address, DNS record values, proxy, or control-panel details
were found in the website repository or the inspected RoadPilot infrastructure
documentation.

## Hosting requirements and recommendations

Any selected host must serve the complete contents of `dist/` at the domain
root over HTTPS, preserve the directory paths above, serve `sitemap.xml` and
`robots.txt`, and return a real 404 for unknown paths. No Node process is
needed in production. Do not add SPA fallback unless the routing model changes.

Recommended HTTP behavior, to implement only in the confirmed hosting layer:

- Redirect HTTP to HTTPS and choose one canonical hostname (`roadpilot.cc` or
  `www.roadpilot.cc`) with a permanent redirect after DNS and certificate
  ownership are confirmed.
- Use `X-Content-Type-Options: nosniff`, a restrictive `Referrer-Policy`,
  `frame-ancestors 'none'` (or equivalent framing protection), and a
  `Permissions-Policy` that disables unused browser features.
- Introduce Content Security Policy in report-only mode first, then enforce a
  policy tested against the generated pages. The pages contain JSON-LD and a
  styled `noscript` fallback, so do not deploy a policy that breaks these
  elements. Keep script and connection sources limited to what the site needs.
- Consider HSTS only once HTTPS works for every intended hostname and
  certificate renewal is operational. Add `includeSubDomains` or preload only
  after all affected subdomains are known to support HTTPS.
- Serve fingerprinted `/assets/` files with long-lived immutable caching.
  Serve HTML and the sitemap with revalidation or short caching so route and
  metadata fixes reach visitors promptly. Apply an appropriate short policy to
  `robots.txt` and avoid immutable caching for it.

## Legal data, access and build handling

- Keep `config/legal.local.json` and any external legal config outside Git.
  Do not add the real values to examples, deployment documentation, workflows,
  commit messages, or diagnostics.
- Supply `ROADPILOT_LEGAL_CONFIG` from a protected build environment if CI is
  used, or build on a controlled machine with the ignored local file. Restrict
  access to the generated artifact because the imprint intentionally publishes
  these details.
- Do not print the config or full rendered legal HTML in logs. Remove temporary
  artifact copies according to the operator's retention policy.
- Publish only the contents of `dist/`. Use a dedicated deploy identity with
  write access only to the site release area; the web server should only need
  read access to published files. Keep credentials outside the repository and
  out of build output.
- Build with the lockfile (`npm ci`) and run the configured typecheck, lint and
  build checks before packaging. The repository's test suite should also pass.

## Release, rollback and operations

- Preserve each deployed static artifact as an immutable version. Prefer
  publishing into a new release directory and switching the active directory
  atomically, or use the selected host's equivalent versioned deployment.
- Retain the previous known-good artifact for immediate rollback. Record the
  source commit and build date with each artifact, without including secrets
  or personal data in public filenames or logs.
- Back up hosting configuration and DNS configuration through the operator's
  approved secure process. Back up legal source data separately with restricted
  access; it must not be embedded as a source config backup in the repository.
- After a future deployment, check HTTPS and expected responses for all nine
  routes, verify `robots.txt` and `sitemap.xml`, confirm assets load, and check
  browser console/network failures. Also confirm the imprint and privacy pages
  show the approved legal details without placeholders. Do not use the root
  page alone as a health check.
- Monitor certificate expiry/renewal, HTTPS availability and failed requests.
  For static hosting, route and asset HTTP checks are the application health
  checks; no app process or container health endpoint is required.

## Open deployment blockers

Before choosing implementation details, confirm with the operator:

1. Which hosting account/provider and origin currently serve the domain, and
   whether the intended target is to keep that setup.
2. Which hostname is canonical, who controls DNS, and who manages HTTPS
   certificates and renewal.
3. Whether there is an existing deployment process, artifact-retention policy,
   backup target and access-control process to preserve.
4. Which approved method supplies the private legal config to the production
   build and who may access the resulting artifacts.

Until these are confirmed, provider-specific configuration, server changes,
DNS edits, credential setup and deployment should remain on hold.
