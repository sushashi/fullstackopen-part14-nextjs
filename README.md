# Full Stack Open Part 14: Next.JS

This repository contains my personal solutions to the exercises from the [Full Stack Open Part 14: Next.JS](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs) course offered by the University of Helsinki.

- [Course material](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs)
- [Course syllabus]()

The end result is deployed on Vercel and is available at: [bloglist-app-indol.vercel.app](bloglist-app-indol.vercel.app)


## Local deployment in dev env

### 1. Clone this repository

### 2. Install dependencies

```bash
npm ci
```
### 3. Create a Neon DB in Vercel (or elsewhere)

### 4. Set up environment variables

Create file `.env.local` at the root of the project with content

```bash
DATABASE_URL=your_neon_database_URL
AUTH_SECRET=any_random_character_sequence
AUTH_URL=http://localhost:3000
```

### 5. Apply migrations on DB

```bash
npx drizzle-kit push
```

### 5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.