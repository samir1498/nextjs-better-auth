# nextjs-better-auth

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Copy `.env.example` to `.env` and update your environment variables:

```bash
cp .env.example .env
````

> **Important:**
> When running with Docker Compose, make sure to set `DB_HOST=local-dev-db` in your `.env` file
> so the app can connect to the database container.

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with Docker Compose

1. Start the app and database services:

```bash
docker compose up -d
```

2. Wait for the database container to be healthy (check with `docker compose logs localdev-db`).

3. Run the Better Auth CLI commands inside the running app container to generate and migrate the database schema:

```bash
docker compose exec app pnpx @better-auth/cli generate
docker compose exec app pnpx @better-auth/cli migrate
```

4. Your app should now be available at [http://localhost:3000](http://localhost:3000).

To follow the logs:

```bash
docker compose logs -f app
```

## Environment Variables

Use the `.env.example` file as a reference for required environment variables. Make sure to:

* Update database credentials accordingly.
* Set `DB_HOST` to `local-dev-db` when running with Docker Compose.
* Keep secrets like `MICROSOFT_CLIENT_SECRET` and `BETTER_AUTH_SECRET` safe and never commit them to public repos.

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Better Auth CLI](https://www.better-auth.com/docs/installation)
