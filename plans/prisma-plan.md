# Prisma Integration Plan

## Goal
Replace the static `app/search/data.json` and `app/search/categories.json` files with a database managed by Prisma.

## Implementation Steps

1.  **Install Prisma and Database Driver:**
    *   Add `prisma` and a database client (e.g., `sqlite`) to the project dependencies using pnpm.

2.  **Initialize Prisma:**
    *   Run `pnpm prisma init` to create the `prisma` directory and `schema.prisma` file.

3.  **Define Prisma Schema (`prisma/schema.prisma`):**
    *   Based on `data.json`, we'll create an `Article` model with fields like `id`, `title`, `article`, `category` (as a relation), `date`, `views`, and `tags`.
    *   Based on `categories.json`, we'll create a `Category` model with `id`, `name`, and `category` (slug).
    *   Establish the relationship between `Article` and `Category`.

4.  **Configure Database:**
    *   Set up the `DATABASE_URL` in `.env` to point to a SQLite database file (e.g., `file:./dev.db`).

5.  **Create and Apply Migration:**
    *   Run `pnpm prisma migrate dev --name init` to create the database schema based on the Prisma models.

6.  **Seed Database (Data Migration):**
    *   Create a `prisma/seed.ts` script to read the data from `app/search/data.json` and `app/search/categories.json` and insert it into the new SQLite database using the Prisma client.
    *   Update `package.json` to include a `prisma:seed` script.

7.  **Generate Prisma Client:**
    *   Run `pnpm prisma generate` to generate the Prisma client based on the schema. This will be done automatically after `prisma migrate dev`.

8.  **Integrate Prisma Client into Application:**
    *   Create a utility file (e.g., `lib/prisma.ts`) to initialize and export the Prisma client.
    *   Modify `app/search/page.tsx` and `app/search/DetailedSearch.tsx` (and any other relevant files) to fetch data using the Prisma client instead of directly importing the JSON files. This will involve creating server-side functions to interact with the database.

9.  **Remove Old JSON Files:**
    *   Delete `app/search/data.json` and `app/search/categories.json` once the data is successfully migrated and the application is using the database.

10. **Update `tsconfig.json`:**
    *   Ensure that the `paths` in `tsconfig.json` are correctly configured if there are any `@app` aliases that might conflict or need adjustment.

11. **Testing:**
    *   Run the application and verify that all search functionalities, category filtering, and article display work as expected.

## Key Considerations

*   **Database Choice:** For this project, SQLite is a good starting point for local development. If a production deployment requires a different database (PostgreSQL, MySQL), the Prisma schema can be easily adapted.
*   **Data Fetching Strategy:** Since this is a Next.js project, we'll leverage server components or `getServerSideProps`/`getStaticProps` (if applicable) to fetch data from Prisma on the server.
*   **Error Handling:** Implement robust error handling for database operations.
