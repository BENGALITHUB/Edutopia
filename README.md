# TUTOPIA: AI Learning Center landing page

A single-page, static, motion-led landing page for **TUTOPIA**. It is built with Vite, React 19, TypeScript (strict), Tailwind CSS v4 and Motion.

- One public page. Every nav item scrolls to a section on the same page; there is no router.
- Static `dist/` output. No server, API keys or backend are needed in production. Node is used only to build.
- All AI on the page is an **interactive, deterministic, client-side demo**. No model is called and no data leaves the browser.

---

## 1. Local development

Requires Node.js 20.19+ or 22.12+ (tested on Node 22.21).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc) + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173
```

Optional:

```bash
npm run typecheck  # TypeScript only
npm run lint       # oxlint
```

---

## 2. Things to configure before launch

| What | Where | Notes |
|---|---|---|
| **Contact email** | `src/lib/constants.ts` → `CONTACT_EMAIL` | Currently `hello@tutopia.example`. While it ends in `.example`, the contact form shows a notice telling the site owner to set it. |
| Enquiry email subject | `src/lib/constants.ts` → `ENQUIRY_SUBJECT` | |
| Announcement line, nav labels | `src/lib/constants.ts` | |
| **Canonical / Open Graph URLs** | `index.html` | Replace every `https://www.example.com/` with the live URL. Social previews need an absolute `og:image` URL. |
| Sitemap line | `public/robots.txt` | Uncomment once a sitemap exists. |
| Programs (sample curriculum) | `src/data/programs.ts` | Replace with confirmed programs. Durations, prices and certifications are deliberately left out. |
| Example projects | `src/data/projects.ts` | |
| FAQ answers | `src/data/faqs.ts` | Confirm delivery format and admissions wording with the school. |
| Student / professional paths | `src/data/paths.ts` | |
| Skill rail → program mapping | `src/data/skills.ts` | |
| Colours / fonts | `src/index.css` (`@theme`) | Fonts are self-hosted via `@fontsource-variable` (Manrope + Inter). |
| Logo | `src/components/Logo.tsx`, `public/favicon.svg` | |
| Social share image | `public/og-cover.svg` (source) → `public/og-cover.jpg` (1200×630, used) | Re-export the JPG if you edit the SVG. |

JSON-LD `EducationalOrganization` is intentionally **omitted** until verified organisation facts are available (address, legal name, and so on). Add it to `index.html` only with confirmed data.

---

## 3. Deploying to cPanel (shared hosting)

The build is plain static files. You do not need Node on the server.

1. Run `npm run build` on your computer or in CI. Most shared hosting cannot run Node build tools.
2. Open the generated `dist/` folder.
3. **Root domain:** upload the **contents** of `dist/` (not the folder itself) into `public_html/`. You should end up with `public_html/index.html`, `public_html/assets/…`, `public_html/.htaccess`, and so on.
   - `.htaccess` is a hidden file. In cPanel File Manager, enable *Settings → Show Hidden Files* to confirm it uploaded.
4. **Subfolder** (e.g. `https://example.com/tutopia/`): upload the contents of `dist/` into `public_html/tutopia/`.
   - The build uses a **relative base (`./`)**, so it works in any folder without rebuilding. This has been tested under a `/tutopia/` path.
   - If you prefer absolute asset URLs, build with the subfolder path and upload to the matching folder:
     ```bash
     BASE_PATH=/tutopia/ npm run build                     # macOS / Linux / Git Bash
     $env:BASE_PATH="/tutopia/"; npm run build             # Windows PowerShell
     ```
5. **HTTPS:** enable SSL in cPanel (AutoSSL / Let's Encrypt). Then uncomment the HTTPS redirect block in `public/.htaccess` and rebuild, or edit `.htaccess` on the server.
6. **Caching and compression:** the included `.htaccess` gzips text assets and caches the hashed `/assets/*` files for one year. `index.html` is always revalidated. Delete the file if your host manages these settings.
7. **Check after upload:** the page loads over HTTPS; the fonts and favicon load; the nav links scroll to their sections; the program filter, dialog, Learning Lab demo and FAQ work; and *Enquire About Tutopia* opens an email to the right address.

This is a single page with hash links only, so no SPA rewrite rule is needed.

---

## 4. Deploying to AWS (S3 + CloudFront)

No EC2, Lambda or other server process is needed.

1. `npm run build`.
2. Create a **private** S3 bucket (Block Public Access on).
3. Upload `dist/` with cache headers suited to each file type:
   ```bash
   # Hashed assets: cache for 1 year
   aws s3 sync dist/ s3://YOUR_BUCKET/ --exclude "*" --include "assets/*" \
     --cache-control "public,max-age=31536000,immutable"
   # Everything else (index.html, favicon, og image, robots.txt): revalidate
   aws s3 sync dist/ s3://YOUR_BUCKET/ --exclude "assets/*" --exclude ".htaccess" \
     --cache-control "no-cache"
   ```
   (`.htaccess` is Apache-only and is skipped.)
4. Create a **CloudFront distribution**:
   - Origin: the S3 bucket, using **Origin Access Control (OAC)**. Apply the bucket policy CloudFront generates.
   - Default root object: `index.html`.
   - Viewer protocol policy: *Redirect HTTP to HTTPS*. Attach an ACM certificate (us-east-1) for your domain.
   - Enable compression (Brotli/Gzip).
   - Error pages: none are needed for a single page. Optionally map 403/404 to `/index.html` with a 200 response.
5. After each deploy, invalidate the HTML: `aws cloudfront create-invalidation --distribution-id ID --paths "/index.html" "/"`.
6. To serve from a sub-path, upload into a prefix (e.g. `s3://bucket/tutopia/`). The relative base works without changes.

Other static hosts (Netlify, Vercel static, Cloudflare Pages, GitHub Pages, nginx) also work: point them at `dist/`.

---

## 5. Project structure

```
client/
  public/                 favicon.svg, og-cover.(svg|jpg), robots.txt, .htaccess
  src/
    animations/           Signature motion systems
      IntelligenceSeed.tsx        #1 tumbling orb (lazy chunk, rAF → SVG attributes)
      IntelligenceSeedFallback.tsx   static pose (reduced motion / loading placeholder)
      SeedScene.tsx, seedGeometry.ts  shared geometry + 3D projection
      SkillConstellation.tsx      #3 living skill constellation
      WorkflowSimulator.tsx       #4 AI workflow pulse simulator (state machine)
      NeuralMini.tsx              toy neural network (input → features → prediction)
      ProgressThread.tsx          #7 scroll-linked progress thread
    components/           Navbar, Footer, Logo, KineticHeading (#6), Reveal,
                          SectionHeading, ProgramCard (#5 magnetic), ProgramArt,
                          ProgramDetailsDialog, FAQAccordion, ScrollToTop
    sections/             Hero, SkillRail, Programs, Journey (#2 thought-to-path),
                          LearningLab, WhyTutopia, AudiencePaths, ProjectGallery, FAQ, Contact
    data/                 programs, projects, faqs, paths, skills (typed content)
    lib/                  constants (config), motion helpers, hooks, scroll,
                          ProgramsContext, categoryStyle, motionFeatures
    App.tsx, main.tsx, index.css
  index.html  vite.config.ts  tsconfig.json  package.json
```

### Motion and accessibility notes
- `prefers-reduced-motion` is honoured everywhere. Under reduced motion the orb is a static pose, the marquee becomes a scrollable row, scrubbed and ambient animation stops, and smooth scrolling is off. The `Save-Data` hint also selects the static orb.
- The orb's animation loop pauses when the orb is off-screen or the tab is hidden. It runs at about 30 fps on touch and small screens.
- Animation features load in a separate chunk (`LazyMotion`), and the orb is its own lazy chunk. The static fallback has the same size, so there is no layout shift when it is swapped.
- The site has a skip link, a focus-trapped dialog and mobile menu (closed with Escape, focus restored), keyboard-operable tabs, an ARIA accordion, and `aria-live` updates for the filter count, the demo event log and the network explanations.

### Hooking up a real backend later
- **Enquiry form:** `src/sections/Contact.tsx` → `onSubmit`. Replace the `mailto:` handoff with a `fetch` to your API or form service. Keep the honest status message.
- **Programs:** swap the arrays in `src/data/*.ts` for API data with the same TypeScript interfaces.

---

## 6. Verification performed

- `npm run build` (includes `tsc --noEmit`, strict mode): passes with no errors.
- `oxlint`: no errors. One informational warning about the context hook export.
- Headless Chrome checks at 360, 390, 768, 1024, 1440 and 1920 px: no horizontal overflow and no console errors. The following were checked and work: the program filter, the details dialog (focus trap, Escape, focus restore), the workflow demo (run, reset, scenario switch), the audience selector, the FAQ, form validation, skill-rail chip → program filter, and the mobile menu. The reduced-motion mode was checked too.
- Lighthouse on `npm run preview`, run locally: desktop scored Performance 100, Accessibility 100, Best Practices 100, SEO 100. Mobile (simulated) scored 93, 100, 100, 100. Real-world results depend on the host, CDN and compression.

> The `../server` folder in the workspace is an empty placeholder. This site does not use it.
