const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.unit.create({
        data: {
            id: 0,
            name: ".",
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.info("Already seeded!");
        await prisma.$disconnect();
    });