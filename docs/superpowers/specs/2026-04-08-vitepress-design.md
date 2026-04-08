# VitePress SEO Site Design

## Goal

Replace the existing Docsify `index.html` with a VitePress static site deployed via GitHub Pages. Each documentation page gets an independent URL (no hash routing), enabling Google to index all 7 content pages separately. The site uses the default VitePress Indigo light theme with a sidebar layout.

## Why VitePress over Docsify

Docsify uses client-side rendering with hash routing (`/#/docs/page`). Hash fragments are not treated as separate pages by Google — all 7 docs would be indexed as one URL. VitePress generates static HTML per page (`/financial-market-data.html`), giving each page its own indexable URL, `<title>`, and `<meta description>`.

## Repository Settings

- **GitHub Pages source:** `gh-pages` branch (built by CI)
- **Site URL:** `https://copiioaicom-spec.github.io/copiioai/`（若已改名则为 `/natural-language-interface-for-internet-data/`）
- Delete `index.html` (Docsify) and `_config.yml` (Jekyll) — both conflict with VitePress

## File Structure

```
copiioai/
├── .nojekyll                        ← prevents GitHub Pages from running Jekyll
├── package.json                     ← vitepress dev dependency
├── .github/
│   └── workflows/
│       └── deploy.yml               ← build + deploy to gh-pages on push to main
├── docs/
│   ├── index.md                     ← homepage (VitePress hero layout)
│   ├── financial-market-data.md     ← existing, add frontmatter
│   ├── real-time-news.md            ← existing, add frontmatter
│   ├── social-media-trends.md       ← existing, add frontmatter
│   ├── entertainment-data.md        ← existing, add frontmatter
│   ├── ecommerce-research.md        ← existing, add frontmatter
│   ├── postman-alternative.md       ← existing, add frontmatter
│   ├── use-cases.md                 ← existing, add frontmatter
│   └── .vitepress/
│       └── config.mts               ← site config: nav, sidebar, sitemap, SEO
└── README.md                        ← unchanged (GitHub repo page)
```

## VitePress Configuration (`docs/.vitepress/config.mts`)

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CopiioAI',
  description: 'Natural language interface for accessing real-time internet data. Ask anything — get live results from Reddit, financial markets, news, social media, and more.',
  base: '/copiioai/',  // change to '/natural-language-interface-for-internet-data/' if repo was renamed
  head: [
    ['meta', { name: 'keywords', content: 'natural language, real-time internet data, API access, Postman alternative, developer tools, chrome extension' }],
    ['link', { rel: 'canonical', href: 'https://copiioaicom-spec.github.io/copiioai/' }],
  ],
  sitemap: {
    hostname: 'https://copiioaicom-spec.github.io/copiioai/'
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Install Free →', link: 'https://chromewebstore.google.com/detail/copiioai/lejbegpfaanpcilacmakkdediinkmnne' }
    ],
    sidebar: [
      { text: 'Home', link: '/' },
      {
        text: 'Data Sources',
        items: [
          { text: 'Financial Market Data', link: '/financial-market-data' },
          { text: 'Real-Time News', link: '/real-time-news' },
          { text: 'Social Media Trends', link: '/social-media-trends' },
          { text: 'Entertainment & Sports', link: '/entertainment-data' },
          { text: 'E-commerce Research', link: '/ecommerce-research' },
        ]
      },
      {
        text: 'More',
        items: [
          { text: 'vs Postman', link: '/postman-alternative' },
          { text: 'Use Cases', link: '/use-cases' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/copiioaicom-spec/copiioai' }
    ]
  }
})
```

## Homepage (`docs/index.md`)

```yaml
---
layout: home
title: CopiioAI — Natural Language Interface for Real-Time Internet Data
description: Access live data from Reddit, financial markets, social media, and news — just by asking in plain English. No coding required.

hero:
  name: CopiioAI
  text: Natural Language Interface for Real-Time Internet Data
  tagline: Ask anything. Get live results from Reddit, financial markets, news, and more. No coding required.
  actions:
    - theme: brand
      text: Install Chrome Extension →
      link: https://chromewebstore.google.com/detail/copiioai/lejbegpfaanpcilacmakkdediinkmnne
    - theme: alt
      text: View Use Cases
      link: /use-cases

features:
  - title: 📈 Financial Data
    details: Live stock prices, crypto, FRED economic indicators, Bloomberg news — in plain English.
    link: /financial-market-data
  - title: 📰 Real-Time News
    details: Hacker News, Google News, NYT, CoinDesk — fetched the moment you ask.
    link: /real-time-news
  - title: 📱 Social Trends
    details: Reddit, TikTok, YouTube, Spotify — live trending data across platforms.
    link: /social-media-trends
  - title: 🎬 Entertainment
    details: IMDb top lists, NBA scores, F1 news, sports results.
    link: /entertainment-data
  - title: 🛒 E-commerce
    details: Amazon search, price comparison, Android app rankings.
    link: /ecommerce-research
  - title: 🔧 vs Postman
    details: No endpoints, no auth setup. Just ask in plain English.
    link: /postman-alternative
---
```

## Per-Page Frontmatter (add to each existing doc)

Each existing `.md` file gets a frontmatter block with `title` and `description`:

| File | title | description |
|---|---|---|
| `financial-market-data.md` | Real-Time Financial Market Data with Natural Language | Access live stock prices, crypto, FRED economic indicators, and Bloomberg news using plain English. No coding required. |
| `real-time-news.md` | Real-Time News Access with Natural Language AI | Get live news from Hacker News, Google News, NYT, CoinDesk, and more — just by asking. |
| `social-media-trends.md` | Real-Time Social Media Trends with Natural Language | Track what's trending on Reddit, TikTok, YouTube, and Spotify in real time. |
| `entertainment-data.md` | Live Entertainment & Sports Data with Natural Language | Get IMDb top lists, NBA scores, F1 news, and sports results by asking in plain English. |
| `ecommerce-research.md` | Natural Language Product Research & E-commerce Data | Search Amazon, compare prices, and track Android app rankings — all in plain English. |
| `postman-alternative.md` | CopiioAI as a Postman Alternative: Natural Language API Access | Replace Postman with plain English. No endpoint URLs, no auth setup, no learning curve. |
| `use-cases.md` | CopiioAI Use Cases: Natural Language Internet Data Access | How developers, analysts, PMs, and marketers use CopiioAI for live internet data. |

## GitHub Actions Deploy Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy VitePress to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

## package.json

```json
{
  "name": "copiioai-docs",
  "private": true,
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.6.3"
  }
}
```

## SEO Summary

| Signal | Implementation |
|---|---|
| Per-page `<title>` | frontmatter `title` field |
| Per-page `<meta description>` | frontmatter `description` field |
| Independent URLs | VitePress static build (no hash routing) |
| Sitemap | `sitemap.hostname` in config.mts |
| Canonical URL | `<link rel="canonical">` in head config |
| Keywords meta | `<meta name="keywords">` in head config |
| Crawlable HTML | Static files, no JS rendering required |
