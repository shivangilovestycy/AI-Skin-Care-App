# Architecture

The project uses a deliberately small Node HTTP server and a static browser interface.

- `server.mjs` serves the frontend, catalog and analysis endpoint
- `public/` contains the dashboard interface
- `.env` contains the local-only NIM credential

The credential never reaches browser JavaScript. The analysis endpoint sends an image only after the user selects a file and starts a plan.
