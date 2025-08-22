# HiveX Site

A fully static Astro site for the HiveX AI security testing platform, built with Tailus-UI/astro-theme and client-side data fetching.

## Features

- **Fully Static**: No server-side rendering, pure client-side data fetching
- **Modern UI**: Built with Tailwind CSS and Tailus-UI components
- **Client-Side Routing**: Single-page application with browser history support
- **Real-time Data**: Fetches data from `data.hivex.aiandme.io` with no-cache headers
- **Responsive Design**: Mobile-first design with Tailwind CSS utilities

## Pages

- **Home**: Displays active and past projects with statistics
- **Project Detail**: Shows project information, README, and security results
- **Leaderboard**: Displays contributor rankings and statistics

## Architecture

### Data Flow
1. Client-side fetch from `PUBLIC_DATA_BASE_URL` environment variable
2. No-cache headers ensure fresh data on each request
3. React components handle state management and UI updates

### Components
- `App.tsx`: Main routing component with client-side navigation
- `ProjectsList.tsx`: Displays projects with filtering by status
- `ProjectDetail.tsx`: Shows project information and results
- `ProjectResults.tsx`: Displays security results with severity filtering
- `Leaderboard.tsx`: Shows contributor rankings
- `MarkdownRemote.tsx`: Renders remote markdown content safely
- `SeverityPill.tsx`: Visual severity indicators

### Data Types
- `Project`: Project metadata and statistics
- `Result`: Security finding details
- `Leaderboard`: Contributor rankings and scoring

## Setup

### Prerequisites
- Node.js 18+
- pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd hivex-site

# Install dependencies
pnpm install

# Set environment variables
echo "PUBLIC_DATA_BASE_URL=https://data.hivex.aiandme.io" > .env

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Environment Variables
- `PUBLIC_DATA_BASE_URL`: Base URL for data API (default: https://data.hivex.aiandme.io)

## Development

### Project Structure
```
src/
├── components/     # React components
├── layouts/        # Astro layout components
├── lib/           # Utility functions and data fetching
├── pages/         # Astro pages
├── types/         # TypeScript type definitions
└── tailus.css     # Tailwind CSS configuration
```

### Key Technologies
- **Astro**: Static site generator
- **React**: Component framework for interactive elements
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript

### Data API Endpoints
- `/index.json`: Projects index with metadata
- `/results-{slug}.json`: Project-specific security results
- `/leaderboard.json`: Contributor rankings

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Other Platforms
The site builds to static files in `dist/` directory, compatible with any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Cloudflare Pages

## Customization

### Styling
- Modify `src/tailus.css` for theme customization
- Update Tailwind config in `tailwind.config.js`
- Use Tailus-UI component classes for consistent design

### Data Sources
- Update `PUBLIC_DATA_BASE_URL` in `.env`
- Modify data fetching logic in `src/lib/data.ts`
- Update type definitions in `src/types/hivex.ts`

## Performance

- **Static Generation**: Pre-built HTML for fast initial load
- **Client Hydration**: React components load after initial render
- **No-cache Fetching**: Ensures fresh data on each visit
- **Code Splitting**: Automatic code splitting by Astro

## Security

- **DOMPurify**: Sanitizes markdown content to prevent XSS
- **Environment Variables**: Secure configuration management
- **Static Output**: No server-side code execution

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `pnpm install`
- Check TypeScript compilation: `pnpm build`
- Verify environment variables are set correctly

### Runtime Issues
- Check browser console for JavaScript errors
- Verify data API endpoints are accessible
- Ensure CORS is configured on data server

## License

This project is licensed under the MIT License.
