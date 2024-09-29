"use client";

import { createNewList } from "./createListAction";


export default function CreateList() {
    return (
        <button
            onClick={() => createNewList()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
            Create new list
        </button>
    )
}

