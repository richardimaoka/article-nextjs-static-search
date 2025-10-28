# Prisma Integration Plan

## Goal
Replace the static `app/search/data.json` and `app/search/categories.json` files with a database managed by Prisma.

## Implementation Steps

- [x] **Install Prisma and Database Driver:**
    *   Add `prisma` and a database client (e.g., `sqlite`) to the project dependencies using pnpm.

- [x] **Initialize Prisma:**
    *   Run `pnpm prisma init` to create the `prisma` directory and `schema.prisma` file.
    *   Configure `schema.prisma` to use the Rust-free engine (`engineType = "client"`) and the ESM-first provider (`provider = "prisma-client"`).

- [x] **Define Prisma Schema (`prisma/schema.prisma`):**
    *   Based on `data.json`, we'll create an `Article` model with fields like `id`, `title`, `article`, `category` (as a relation), `date`, `views`, and `tags`.
    *   Based on `categories.json`, we'll create a `Category` model with `id`, `name`, and `category` (slug).
    *   Establish the relationship between `Article` and `Category`.

- [x] **Configure Database (SQLite):**
    *   Set up the `DATABASE_URL` in `.env` to point to a SQLite database file (e.g., `file:./dev.db`).

- [x] **Create and Apply Migration:**
    *   Run `pnpm prisma migrate dev --name init` to create the database schema based on the Prisma models.

- [x] **Seed Database (Data Migration):**
    *   Move `app/search/data.json` and `app/search/categories.json` to the `prisma/seed` directory.
    *   Create a `prisma/seed.ts` script to read the data from `prisma/seed/data.json` and `prisma/seed/categories.json` and insert it into the new SQLite database using the Prisma client.
    *   Update `package.json` to include a `prisma:seed` script.

- [x] **Generate Prisma Client:**
    *   Run `pnpm prisma generate` to generate the Prisma client based on the schema. This will be done automatically after `prisma migrate dev`.

- [ ] **Integrate Prisma Client into Application:**
    *   Create a utility file (e.g., `lib/prisma.ts`) to initialize and export the Prisma client.
    *   Modify `app/search/page.tsx` and `app/search/DetailedSearch.tsx` (and any other relevant files) to fetch data using the Prisma client instead of directly importing the JSON files. This will involve creating server-side functions to interact with the database.

- [ ] **Update `tsconfig.json`:**
    *   Ensure that the `paths` in `tsconfig.json` are correctly configured if there are any `@app` aliases that might conflict or need adjustment.

- [ ] **Testing:**
    *   Run the application and verify that all search functionalities, category filtering, and article display work as expected.

- [ ] **Error Handling:**
    *   Review the error the handling strategy for database operations.