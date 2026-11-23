# saudiclintsite

Al-Haddadah’s bilingual welding and aluminum workshop website in Riyadh. Arabic is served at `/` and English at `/en`. Quote forms open WhatsApp with the project details.

## Deploy to Vercel

Import this repository into Vercel, select the `main` branch, and leave the root directory at the repository root. The included `vercel.json` runs `node build.mjs --vercel` and publishes `dist/`. The build has no package dependencies.

The build uses Vercel’s production domain for canonical links, language alternates, the sitemap and social previews. To choose a specific custom domain, set `SITE_ORIGIN` to its full HTTPS address and redeploy.

## Local build

Run `node build.mjs` from the repository root to rebuild the static pages. Project photos, fonts, logos, styles and browser scripts are stored in `dist/assets/` and should be kept when rebuilding the pages.
