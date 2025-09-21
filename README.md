# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Getting Started (Windows)

### Prerequisites
- Node v20.17.0
- npm 10+

### Commands
```powershell
cd slm-explainer
npm install
npm run dev
```

### Troubleshooting
- Port in use: change the port with `npm run dev -- --port 5174`.
- Blank styles/Tailwind not applied: ensure `src/index.css` includes `@tailwind base; @tailwind components; @tailwind utilities;` and `src/main.tsx` imports `./index.css`.
- Tailwind CLI missing: reinstall dev deps and/or run `npm exec tailwindcss init -p`.
- PowerShell vs cmd: use PowerShell for the commands above; if using cmd, remove backticks and adjust paths accordingly.

## Deploy

### Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist/`
- Install command: `npm install`
- Ensure `vercel.json` exists (see below).

Steps:
1. Push to GitHub.
2. Import repo in Vercel. Framework: Vite. Override Output: `dist/` if needed.
3. Deploy.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist/`
- Base directory: (blank)
- Ensure `netlify.toml` exists (see below).

Steps:
1. Push to GitHub.
2. New Site from Git → pick repo.
3. Set build/publish as above → Deploy.

## CI
- Recommended: enable Vercel/Netlify “Deploy Previews” for PRs.
- Optional GitHub Actions matrix (Node 20.x): install, build, lint on pull_request/main.
You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
