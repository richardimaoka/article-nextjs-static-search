
ニュース記事とそのタイトルを3本作成し、JSONで出力してください。3本の記事はそれぞれ政治、経済、外交のニュースで、日付は2025-01-01のみ、JSONは以下の形式です。
[
  { "title": "xxxxx", "article": "yyyyyyyyyyyyyy", "category": "政治", "date": "2025-01-01", views: 28000, tags: ["日本復活党", "農水省"] },
  { "title": "xxxxx", "article": "yyyyyyyyyyyyyy", "category": "経済", "date": "2025-01-01", views: 18050, tags: ["自動車", "貿易", "投資", "AI"] },
  { "title": "xxxxx", "article": "yyyyyyyyyyyyyy", "category": "外交", "date": "2025-01-01", views: 4025,  tags: ["米国", "ASEAN"] }
]


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
