import { getItems } from "@/lib/dbFunctions/item";
import { getList } from "@/lib/dbFunctions/list";
import { notFound } from "next/navigation";
import ShoppingList from "./ListCustomerCompononet";

export default async function List({ params }: { params: { listId: number } }) {
    const allItems = await getItems();
    const list = await getList(params.listId);

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

