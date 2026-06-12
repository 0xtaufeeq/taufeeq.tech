# taufeeq.tech

Personal portfolio of [Taufeeq Riyaz](https://taufeeq.tech) — rebuilt from scratch with Next.js 15 (App Router), Tailwind CSS v4, and Framer Motion.

## Design

- AMOLED black (`#050505`) with an electric-emerald accent (`#00d97e`)
- Switzer (body) · Playfair Display (display) · DM Mono (labels)
- Lenis smooth scrolling, custom difference-blend cursor, film-grain overlay
- Word-by-word blur-rise hero, scroll-velocity marquee, spotlight bento grid,
  pinned horizontal values ticker, parallax footer wordmark

## Stack

| Layer     | Tools                                       |
| --------- | ------------------------------------------- |
| Framework | Next.js 15, React 19, TypeScript            |
| Styling   | Tailwind CSS v4, @tailwindcss/typography    |
| Motion    | Framer Motion, Lenis                        |
| Content   | MDX via next-mdx-remote + rehype-pretty-code |
| Live data | Spotify, GitHub GraphQL, wttr.in, MapTiler  |

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

### Environment variables (`.env.local`)

```
MAPTILER_API_KEY=
GITHUB_ACCESS_TOKEN=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

## Content

Projects and blog posts live in `content/projects/*.mdx` and `content/blog/*.mdx` with frontmatter. Custom MDX components (e.g. `<GithubCard owner="..." repository="..." />`) are registered in `components/mdx/Mdx.tsx`.
