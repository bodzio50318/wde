import prisma from "@/lib/prisma";

export const getItems = async () => {
    "use server";
    const items = await prisma.item.findMany({
        include: {
            unit: true,
        },
    });
    return items;
}

export const dbAddItem = async (name: string) => {
    "use server";
    const item =await prisma.item.create({
        data: {
            name: name,
            unitId: 0,
        },
    });
    return item;
};

export const deleteItem = async (itemId: number) => {
    "use server";
    await prisma.item.delete({ where: { id: itemId } });
};