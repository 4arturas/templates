import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@admin.com",
            role: "admin",
        },
    });
    console.log({ user });



    /*const categoryValue = await prisma.categoryValue.upsert({
        create: {
            where: {name: 'LT'},
            update: {},
            create: {
                name: 'LT'
            }
        }
    });
    console.log({ categoryValue });*/
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });