import prisma from "@/lib/prisma";


export const getList = async (listId: number) => {
    "use server";
    const list = await prisma.list.findFirst({
        where: { id: Number(listId) },
        include: {
            items: true,
        },
    });
    return list;
}