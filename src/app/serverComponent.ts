// src/app/item/deleteItem.ts
"use server";
import prisma from "@/lib/prisma";
import { List } from "@prisma/client/edge";


export const getItems = async () => {
    const items = await prisma.item.findMany({
        include: {
            unit: true,
        },
    });
    return items;
}

export const deleteItem = async (itemId: number) => {
    await prisma.item.delete({ where: { id: itemId } });
};

export const dbAddItem = async (formData: FormData) => {
    const item = await prisma.item.create({
        data: {
            name: formData.get("name") as string,
            unitId: 0,
        },
    });
}

export async function addItemServerSide(itemName: string) {
    if (!itemName) {
        throw new Error('Item name is required');
    }
    const item = await prisma.item.create({
        data: {
            name: itemName,
            unitId: 0,
        },
    });
    return item;
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


export const getListFromDb = async (listId: number) => {
    const list = await prisma.list.findFirst({
        where: { id: Number(listId) },
        include: {
            items: true,
        },
    });
    return list;
}

export const getAllListsFromDb = async () => {
    const lists = await prisma.list.findMany({
        include: {
            items: true,
        },
    });
    return lists;
}

export async function createNewListInDb() {
    const newlist = await prisma.list.create({
        data: {
            name: "List",
        },
    });
    return newlist;
}

export async function deleteListFromDb(listId: number) {
    await prisma.list.delete({
        where: { id: Number(listId) },
    });
}

export async function updateListNameInDb(listId: number, newName: string) {
    await prisma.list.update({
        where: { id: Number(listId) },
        data: {
            name: newName,
        },
    });
}