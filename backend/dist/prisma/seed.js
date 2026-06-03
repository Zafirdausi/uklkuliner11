"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
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
//# sourceMappingURL=seed.js.map