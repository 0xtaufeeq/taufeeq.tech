# Taufeeq Riyaz - Portfolio Website

A modern, performant personal portfolio website showcasing my projects, blog posts, and professional journey.

**Live Site:** [taufeeq.tech](https://taufeeq.tech)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 10+ (or npm/yarn)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0xtaufeeq/taufeeq.tech.git
   cd taufeeq.tech
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Fill in the required environment variables:
   ```env
   MAPTILER_API_KEY=
   
   GITHUB_ACCESS_TOKEN=
   
   SPOTIFY_CLIENT_ID=
   SPOTIFY_CLIENT_SECRET=
   SPOTIFY_REFRESH_TOKEN=
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build for Production

```bash
# Type check
pnpm astro check

# Build the project
pnpm build

# Preview the production build locally
pnpm preview
```

## Contributing

While this is a personal portfolio, I'm open to suggestions and improvements! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Website:** [taufeeq.tech](https://taufeeq.tech)
- **Email:** taufeeq@cc.cc

---

If you found this project interesting, consider giving it a star!
