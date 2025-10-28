import { PrismaClient } from '../app/generated/prisma';
import * as articlesData from './data.json';
import * as categoriesData from './categories.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Seed Categories
  for (const category of categoriesData) {
    await prisma.category.upsert({
      where: { category: category.category },
      update: {},
      create: {
        name: category.name,
        category: category.category,
      },
    });
  }
  console.log('Seeded categories.');

  // Seed Articles
  for (const article of articlesData) {
    const createdArticle = await prisma.article.create({
      data: {
        title: article.title,
        article: article.article,
        category: {
          connect: { category: article.category },
        },
        date: new Date(article.date),
        views: article.views,
      },
    });

    // Seed Tags for each article
    for (const tagName of article.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });

      await prisma.articleTag.create({
        data: {
          articleId: createdArticle.id,
          tagId: tag.id,
        },
      });
    }
  }
  console.log('Seeded articles and tags.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
