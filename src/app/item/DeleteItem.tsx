"use client";
import { deleteItem } from "./deleteItem";
interface DeleteItemProps {
    id: number;
}
export default function DeleteItem(props: DeleteItemProps) {
    return (
        <button
            onClick={() => deleteItem(props.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
            Delete
        </button>
    )
}

