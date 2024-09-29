// src/app/item/deleteItem.ts
"use server";
import { dbAddItem } from "@/lib/dbFunctions/item";
import prisma from "@/lib/prisma";

export async function addItemServerSide(itemName: string) {
    return await dbAddItem(itemName);
}

export async function addItemToList(listId: number, itemId: number) {
    const updatedList = await prisma.list.update({
        where: { id: Number(listId) },
        data: {
            items: {
                connect: { id: itemId },
            },
        },
        include: {
            items: true,
        },
    });
    return updatedList;
};