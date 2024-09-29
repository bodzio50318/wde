// src/app/item/deleteItem.ts
"use server";
import { dbAddItem } from "@/lib/dbFunctions/item";
import prisma from "@/lib/prisma";
import { List } from "@prisma/client/edge";

export async function addItemServerSide(itemName: string) {
    return await dbAddItem(itemName);
}

export async function addItemToList(listId: number, itemId: number): Promise<List> {
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

export async function removeItemFromList(listId: number, itemId: number): Promise<List> {
    const updatedList = await prisma.list.update({
        where: { id: Number(listId) },
        data: {
            items: {
                disconnect: { id: itemId },
            },
        },
        include: {
            items: true,
        },
    });
    return updatedList;
};

export async function getAllList(): Promise<List[]> {
    return await prisma.list.findMany({
        include: {
            items: true,
        },
    });
}