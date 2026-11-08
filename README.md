# Next Blog App

A full-stack blogging platform for discovering and publishing articles. Readers can search and browse posts, view author profiles, and—when signed in—like and comment on articles. Authors can manage their own content through a dashboard, while administrators have a separate area for managing platform content and users.

## Features

### Reading and discovery
- Browse articles and view individual articles with author details, category, featured image, and estimated reading time.
- Search articles by title or category, with paginated results.
- Browse topic and author pages.
- Read and interact with comments on article pages.

### Signed-in users and authors
- Sign in through Clerk.
- Create, edit, and delete your articles from the dashboard.
- Write article content with a rich-text editor.
- Upload featured images to Cloudinary when creating an article.
- Like and unlike articles, and add comments.
- Update your profile name and role in dashboard settings.

### Administration
- Use the separate `/admin` area to manage articles, comments, likes, users, and projects.
- Create and edit articles, including assigning an author and setting a featured image.
- Manage projects with titles, descriptions, technology-stack details, images, and optional GitHub or live-demo links.

## Tech stack

- **Framework:** Next.js 15 App Router with React 19 and TypeScript
- **Authentication:** Clerk
- **Database:** PostgreSQL with Prisma
- **Image storage:** Cloudinary
- **Validation:** Zod
- **UI:** Tailwind CSS, Radix UI, and Lucide icons
- **Article editing:** `react-quill-new`

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/articles` | Article listing, search, and pagination |
| `/articles/[id]` | Article details, likes, and comments |
| `/authors` | Author directory |
| `/topics` | Topic browsing |
| `/dashboard` | Signed-in user dashboard |
| `/dashboard/articles` | Manage your articles |
| `/dashboard/comments` | Dashboard comment area |
| `/dashboard/settings` | Profile settings |
| `/admin` | Administrator dashboard |
| `/admin/articles` | Administrator article management |
| `/admin/comments` | Administrator comment management |
| `/admin/likes` | Administrator likes management |
| `/admin/projects` | Administrator project management |
| `/admin/users` | Administrator user management |

The app also includes pages for about, privacy, terms, cookies, licenses, tutorials, and podcasts.

## Getting started

### Prerequisites

- Node.js and npm
- A PostgreSQL database
- Clerk credentials for authentication
- Cloudinary credentials for article image uploads

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

Set up the Clerk application and PostgreSQL database before starting the app. Cloudinary credentials are used by the article image-upload actions.

### 3. Apply database migrations

```bash
npx prisma migrate deploy
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev          # Start the Next.js development server
npm run build        # Generate the Prisma client and build the app
npm run start        # Start the production server
npm run lint         # Run the configured Next.js lint command
npm run vercel-build # Generate Prisma client, deploy migrations, and build
```

The Prisma client is also generated during dependency installation through the `postinstall` script.

## Project structure

```text
prisma/
  schema.prisma       PostgreSQL models for users, articles, comments, likes, and projects
  migrations/         Database migrations
src/
  actions/            Server actions for articles, comments, likes, search, and admin tasks
  app/                App Router pages and layouts
    (home)/           Home page and shared home layout
    articles/         Article list and article detail routes
    authors/          Author directory
    topics/            Topic browsing
    dashboard/        Signed-in user dashboard routes
    admin/             Administrator routes
  components/
    articles/         Article listing, detail, editing, search, and like UI
    comments/         Comment form and list
    dashboard/        User dashboard components
    admin/             Administrator management components
    home/              Home page, header, and footer
    ui/                Shared interface components
  lib/
    query/             Article data queries
    admin-auth.ts      Administrator access checks
    prisma.ts          Prisma client
  middleware.ts        Clerk middleware
```

## Security note

Review `src/lib/admin-auth.ts` before deploying. It contains hard-coded administrator credentials and a fallback signing secret. Replace these with securely managed environment variables, rotate any credentials that may have been used, and do not rely on source-code defaults for production access.
