import prisma from '../lib/prisma.js';

(async () => {
  try {
    const posts = await prisma.post.findMany();
    console.log('posts length:', posts.length);
    await prisma.$disconnect();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
