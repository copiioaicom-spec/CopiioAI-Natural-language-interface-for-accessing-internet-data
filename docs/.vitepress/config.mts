import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CopiioAI',
  description: 'Natural language interface for accessing real-time internet data. Ask anything — get live results from Reddit, financial markets, news, social media, and more.',
  base: '/copiioai/',
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
      {
        text: 'Install Free →',
        link: 'https://chromewebstore.google.com/detail/copiioai/lejbegpfaanpcilacmakkdediinkmnne'
      }
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
