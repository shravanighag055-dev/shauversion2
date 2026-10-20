# Shravani Ghag — Portfolio (Level 3 Advanced)

A fast, accessible, light-theme portfolio built with plain HTML, CSS and JavaScript. No build step, no dependencies, no backend. It works on GitHub Pages as-is.

## Folder structure

```
index.html            Page structure, SEO and social metadata
404.html              Custom "page not found" page (GitHub Pages serves it automatically)
css/styles.css        All styling (sage-green light theme, responsive, reduced-motion support)
js/data.js            ★ YOUR CONTENT: projects, certificates, skills, services, contact details
js/main.js            Behaviour: filters, search, modals, form, navigation (rarely needs edits)
assets/resume/        Shravani_Ghag_Resume.pdf (the Download Resume button)
assets/certs/         originals/ (your real files) · thumbs/ and previews/ (web-optimised images)
assets/img/           favicon.svg, og-image.png (social sharing preview)
.nojekyll             Tells GitHub Pages to serve files as-is
```

## Run it locally

Open `index.html` in a browser. For the most accurate behaviour you can also run a tiny local server:

```
python3 -m http.server 8000      # then open http://localhost:8000
```

## Deploy to GitHub Pages

Your existing site is `https://shravanighag055-dev.github.io/portfolio/`, so the repository is named **portfolio**.

1. Open the `portfolio` repository on GitHub.
2. Delete or replace the old files, then upload **everything inside this folder** (including the `css`, `js`, `assets` folders and the hidden `.nojekyll` file) to the repository root. Using GitHub Desktop or `git` is easiest for folders.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. Wait a minute, then refresh `https://shravanighag055-dev.github.io/portfolio/`.

If your repository has a different name, change `/portfolio/` in `404.html` and the `canonical` / `og:` URLs in `index.html`.

## How to update things

**Everything is edited in `js/data.js`.**

| To change… | Do this |
|---|---|
| **Add a project** | Copy any block in `PROJECTS`, change the fields. Category must be one of `Web Development`, `AI & Data`, `Programming`, `Other` (or invent a new one; the filter button appears automatically). |
| **Add a GitHub / live-demo link** | Fill in `github: ""` and/or `demo: ""` for that project. The button appears only when a link exists. |
| **Add a certificate** | Put the PDF/JPG/PNG in `assets/certs/originals/` named `my-cert.pdf`. Put a preview image `my-cert.webp` in `assets/certs/thumbs/` (about 560px wide) and `assets/certs/previews/` (about 1200px wide). Then add an entry to `CERTS` with the same `id` (`my-cert`) and `ext`. Only fill `date` if it is printed on the certificate. |
| **Replace the resume** | Overwrite `assets/resume/Shravani_Ghag_Resume.pdf` (keep the filename). |
| **Change email / LinkedIn / GitHub** | Edit `SITE` at the top of `data.js`, **and** the links in `index.html` (Contact section and footer) — search for the old value. |
| **Add a profile photo** | Save it as `assets/img/profile.jpg` (square, under 200 KB) and follow the comment in the hero section of `index.html`. |
| **Edit skills or services** | Edit `SKILLS` / `SERVICES` in `data.js`. |
| **Change colours** | Edit the variables at the top of `css/styles.css` (`--accent`, `--bg`, …). |

## Contact form — how it works

There is no backend, so by default the form uses **`mailto:`**: after validation it opens the visitor's own email app with the message pre-filled, and the visitor presses Send. Limitations: it needs an email app/webmail handler on the visitor's device, and the message is not sent from the website itself.

To receive messages without that limitation, create a free form endpoint (for example at formspree.io) and paste its URL into `formEndpoint` in `js/data.js`. The form then sends via `fetch`. This needs your own account; no keys are stored in this code.

## Privacy note

The downloadable resume PDF includes your phone number. Anyone can download it from your public site. If you don't want that, upload a version without it.

## Not included on purpose

Projects named in your brief that weren't in your resume or files (DataSprint, TradeMind AI, MoodCanvas, Chandra Setu) were **not** added. Add them as `PROJECTS` entries once you have the details. A dark theme, a backend and paid services are also excluded.

---

## What changed from the starter

| File | Change |
|---|---|
| `index.html` | Rebuilt: hero with 3 actions, About, Skills dashboard, Projects, Certificates, Education timeline, Freelance services, Contact form, footer, scroll-to-top, shared modal, full SEO/Open Graph/JSON-LD metadata, skip link. |
| `css/styles.css` | New file (was inline). Design tokens, responsive grid, focus states, modal, reduced-motion support. |
| `js/data.js` | New. Single place for all content. |
| `js/main.js` | New. Mobile menu, scroll-spy, project/certificate filters + search + empty states, modals with focus trap, certificate previous/next, validated contact form, reveal animations. |
| `404.html`, `.nojekyll` | New. |
| `assets/` | New: 13 certificate originals + web previews, resume PDF, favicon, social image. |

**Improvements:** 14 projects (was 12, adds Guess the Number Game and Music Web Page from your resume); 13 real certificates with preview (was text-only); skills in six categories; filters and search; project detail modals; working resume download; real GitHub link (was a placeholder); freelance services; contact form; accessibility (keyboard navigation, focus rings, ARIA, alt text); performance (certificate images converted to WebP, lazy-loaded).

**Corrections made from your files:** the Deloitte simulation is issued via **Forage** (your resume says Sololearn); Semrush certificates show "Valid until 6 Jun 2027" because no issue date is printed; "Basic C Language" on your resume is shown as "C Programming Basics" (the title on the file).

## Testing checklist

Automated browser tests (Playwright / Chromium) — **passed**:
- [x] Page loads with no console errors and no failed requests; all images load
- [x] 14 projects, 13 certificates, 6 skill groups, 6 services render
- [x] Project filters (Web Development 6 · AI & Data 2 · Programming 4 · Other 2) and search; empty state and reset
- [x] Certificate filters and search; empty state; preview modal; Previous/Next; original-file link
- [x] Project modal opens; Esc and ✕ close it; focus returns to the card
- [x] Resume downloads a real PDF
- [x] Contact form: required-field, email and message validation, error and success messages; service cards pre-select the service
- [x] All in-page anchors resolve; external links use `rel="noopener noreferrer"`
- [x] Scroll-to-top; skip link; mobile menu opens/closes
- [x] No horizontal overflow at 320, 375, 768 and 1280 px; reduced-motion shows content without animation
- [x] 404 page serves

**Not tested / needs you:**
- [ ] The `mailto:` hand-off to a real email app (tested only that validation passes and the success message appears)
- [ ] The optional `formEndpoint` (needs your own form service)
- [ ] Live GitHub Pages deployment and the `404.html` redirect on the real domain
- [ ] External links (GitHub, LinkedIn) — the test environment cannot reach those sites; confirm they open correctly
- [ ] Real-device testing (iPhone Safari, Android Chrome); only Chromium was used
- [ ] Screen-reader testing; colour contrast was designed to WCAG AA but not machine-audited
- [ ] Social-sharing preview (needs the site to be live)
