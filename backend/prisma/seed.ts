import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@kuliner.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@kuliner.com',
      password: hashed,
      role: 'ADMIN',
    },
  });

  console.log('Admin seeded!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());