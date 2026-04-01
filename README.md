# Canyon Website

Enterprise AI Production Platform website. Built with Next.js 14, deployed on Vercel.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your env vars
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Link to Vercel project
vercel

# Add environment variables
vercel env add ANTHROPIC_API_KEY
vercel env add NEXT_PUBLIC_HUBSPOT_ID
vercel env add NEXT_PUBLIC_CALENDLY_URL
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy to production
vercel --prod
```

Or push to GitHub and connect the repo in the Vercel dashboard.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | API key for homepage demo | Yes |
| `NEXT_PUBLIC_HUBSPOT_ID` | HubSpot tracking ID | No |
| `NEXT_PUBLIC_CALENDLY_URL` | Demo booking link | No |
| `NEXT_PUBLIC_SITE_URL` | Production URL for sitemap/OG | No |

## Routes

| Route | Page |
|-------|------|
| `/` | Homepage with interactive demo |
| `/product` | Product overview (3 layers) |
| `/product/semantic-data-layer` | Data layer deep dive |
| `/product/agent-orchestration` | Agent orchestration deep dive |
| `/product/deployment` | Deployment deep dive |
| `/security` | CISO gate-check page |
| `/examples` | Filterable example library |
| `/integrations` | Integration hub (40+ tools) |
| `/solutions/operations` | Canyon for Operations |
| `/solutions/finance` | Canyon for Finance |
| `/solutions/sales` | Canyon for Sales |
| `/solutions/data-it` | Canyon for Data & IT |
| `/solutions/customer-success` | Canyon for Customer Success |
| `/solutions/people` | Canyon for People |
| `/solutions/government` | Canyon for Government |
| `/resources/blog` | Blog index |
| `/resources/events` | Events listing |

## SEO & AI Agent Optimization

- Per-page meta titles and descriptions
- Open Graph tags on every page
- JSON-LD structured data in root layout
- `sitemap.xml` auto-generated
- `robots.txt` allows all crawlers
- `llms.txt` and `llms-full.txt` for AI agent discovery (Perplexity, ChatGPT browsing, etc.)

## Project Structure

```
src/
  app/
    layout.jsx          # Root layout (fonts, meta, HubSpot, JSON-LD)
    globals.css         # Base styles, responsive breakpoints
    page.jsx            # Homepage route
    sitemap.js          # Dynamic sitemap
    api/demo/route.js   # Anthropic API proxy for homepage demo
    [routes]/page.jsx   # Route files with metadata exports
  components/
    Header.jsx          # Shared nav with Product dropdown
    Footer.jsx          # Shared footer with link columns
    MockScreenshot.jsx  # SVG chart component for example tiles
    pages/              # Page content components (self-contained)
public/
  logo.png              # Canyon logo
  robots.txt
  llms.txt              # AI agent discovery (short)
  llms-full.txt         # AI agent discovery (detailed)
```

## Next Steps

- [ ] Add real Calendly URL to env
- [ ] Add HubSpot tracking ID
- [ ] Connect custom domain in Vercel
- [ ] Replace placeholder blog/event content with real posts (Keystatic CMS)
- [ ] Create OG image (1200x630, dark bg + logo + tagline)
- [ ] Generate favicons from logo (use realfavicongenerator.net)
- [ ] Get Boyan input on: certification workflow, control plane boundary, supported runtimes
- [ ] Build /solutions index page (tiles linking to 7 verticals)
