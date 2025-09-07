import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(' Starting seed...');

  // Create tag categories
  const categories = await Promise.all([
    prisma.tagCategory.upsert({
      where: { name: 'Genre' },
      update: {},
      create: { name: 'Genre' },
    }),
    prisma.tagCategory.upsert({
      where: { name: 'Theme' },
      update: {},
      create: { name: 'Theme' },
    }),
    prisma.tagCategory.upsert({
      where: { name: 'Setting' },
      update: {},
      create: { name: 'Setting' },
    }),
  ]);

  // Create tags
  const tags = await Promise.all([
    // Genre tags
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Fantasy', categoryId: categories[0].id } },
      update: {},
      create: { name: 'Fantasy', categoryId: categories[0].id },
    }),
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Science Fiction', categoryId: categories[0].id } },
      update: {},
      create: { name: 'Science Fiction', categoryId: categories[0].id },
    }),
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Romance', categoryId: categories[0].id } },
      update: {},
      create: { name: 'Romance', categoryId: categories[0].id },
    }),
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Mystery', categoryId: categories[0].id } },
      update: {},
      create: { name: 'Mystery', categoryId: categories[0].id },
    }),
    // Theme tags
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Adventure', categoryId: categories[1].id } },
      update: {},
      create: { name: 'Adventure', categoryId: categories[1].id },
    }),
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Friendship', categoryId: categories[1].id } },
      update: {},
      create: { name: 'Friendship', categoryId: categories[1].id },
    }),
    // Setting tags
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Modern Day', categoryId: categories[2].id } },
      update: {},
      create: { name: 'Modern Day', categoryId: categories[2].id },
    }),
    prisma.tag.upsert({
      where: { name_categoryId: { name: 'Medieval', categoryId: categories[2].id } },
      update: {},
      create: { name: 'Medieval', categoryId: categories[2].id },
    }),
  ]);

  console.log(` Created ${categories.length} categories`);
  console.log(` Created ${tags.length} tags`);
  console.log(' Seed completed!');
}

main()
  .catch((e) => {
    console.error(' Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
