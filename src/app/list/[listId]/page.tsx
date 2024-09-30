
import { notFound } from "next/navigation";
import ShoppingList from "./ListCustomerCompononet";
import { getItems, getListFromDb } from "@/app/serverComponent";

export default async function List({ params }: { params: { listId: number } }) {
    const allItems = await getItems();
    const list = await getListFromDb(params.listId);

    if (!list) {
        notFound();
    }

    return (
        <div>
            <ShoppingList
                list={list}
                currentItems={list.items}
                dbItems={allItems}
            />
        </div>
    );
}

