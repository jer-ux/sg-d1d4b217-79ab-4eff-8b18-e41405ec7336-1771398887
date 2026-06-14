---
title: Interactive First-Page PDF Previews in Uploads Library
status: in_progress
priority: urgent
type: feature
tags: [uploads, interactive, previews, pdf]
created_by: agent
created_at: 2026-06-14T14:58:00Z
position: 29
---

## Notes:
Integrate interactive PDF first-page previews for every report uploaded to the site, and ensure every file requested is showcased with a high-fidelity inline card layout.

## Checklist:
- [ ] Catalog all remaining user PDF uploads in the asset array inside `all-uploads.tsx`.
- [ ] Implement browser-native iframe page 1 rendering (`#page=1&toolbar=0&navpanes=0&scrollbar=0`) with interactive click-to-expand overlays.
- [ ] Run a project check to verify the build is clean and flawless.