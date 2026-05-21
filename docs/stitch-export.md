# Stitch Export

This project includes a repeatable Stitch export utility:

```bash
npm run fetch:stitch
```

It exports the following Stitch project:

- Title: DRISHTI Surveillance Dashboard
- ID: `8667863899280395890`

Screens:

- Design System: `asset-stub-assets-d98dba33492f4efc8580c528a3760c87-1779338084499`
- DRISHTI Dashboard: `bed7d7269e254de893275d26672addb9`
- DRISHTI Tactical Dashboard: `bfb6f75add8a4c47b9d87b0e2c2ab0cc`
- DRISHTI Tactical Startup Prototype: `e8207144f99648cea6027a29cc2c8ad7`

## Auth

The Stitch SDK requires one of these auth options:

```bash
export STITCH_API_KEY="..."
```

or:

```bash
export STITCH_ACCESS_TOKEN="..."
export GOOGLE_CLOUD_PROJECT="..."
```

After auth is configured, the script downloads each screen's `screen.html` and `screen.png` into `stitch_exports/` using `curl -L`.

