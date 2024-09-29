// src/app/item/deleteItem.ts
"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteItem(itemId: number) {
  await prisma.item.delete({ where: { id: itemId } });
  revalidatePath("/item");
}