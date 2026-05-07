# Atlas Ascenseurs React

Modern Vite + React conversion of `atlas-lift_4.html`.

## Run

```bash
npm install
npm run dev
```

## Image Updates

All design image references are centralized in `src/data/siteData.js`.

Replace files inside:

- `src/assets/images/hero/`
- `src/assets/images/elevators/`
- `src/assets/images/projects/`
- `src/assets/images/logos/`

Keep the same filenames for drop-in swaps, or update the imports in `src/data/siteData.js`.

## 3D Configurator Lead Export

The configurator can save client details to a Google Sheet and email the owner at `adilchagri7@gmail.com`.

1. Log in to Google with `adilchagri7@gmail.com`.
2. Open <https://script.google.com/> and create a new Apps Script project.
3. Paste the contents of `google-apps-script/atlas-leads.gs`.
4. Click **Deploy** > **New deployment**.
5. Choose **Web app**.
6. Set **Execute as** to **Me**.
7. Set **Who has access** to **Anyone**.
8. Deploy, authorize the script, and copy the Web App URL.
9. Create `.env` from `.env.example` and set:

```bash
VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

10. Restart the dev server or rebuild the site.

The first lead submission creates a Google Sheet named `Atlas Ascenseurs 3D Leads` in that Google account and appends each client configuration to the `Leads` tab.
