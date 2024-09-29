import { getItems } from "@/lib/dbFunctions/item";
import { getList } from "@/lib/dbFunctions/list";
import { notFound } from "next/navigation";
import ShoppingList from "./ListCustomerCompononet";

export default async function Lists({ params }: { params: { listId: number } }) {
    const allItems = await getItems();
    const list = await getList(params.listId);

    if (!list) {
        notFound();
    }

    return (
        <div>
            <h1>Lists</h1>
            <ShoppingList
                list={list}
                currentItems={list.items}
                dbItems={allItems}
            />
        </div>
    );
}

