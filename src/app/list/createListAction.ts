"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createNewList() {
    const newlist = await prisma.list.create({
        data: {
            name: "List",
        },
    });

    redirect(`/list/${newlist.id}`);
}