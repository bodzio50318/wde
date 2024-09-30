'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Item, List } from "@prisma/client/edge"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { createNewListInDb, deleteListFromDb, updateListNameInDb } from "../serverComponent"

interface ExtendedList extends List {
  items: Item[]
}

interface Props {
  listOflists: ExtendedList[];
}

export default function ListManager({ listOflists }: Props) {
  const [lists, setLists] = useState<ExtendedList[]>(listOflists)
  const [editingId, setEditingId] = useState<Number | null>(null)
  const [editingName, setEditingName] = useState<string>("")

  const startEditing = (id: number, currentName: string) => {
    setEditingId(id)
    setEditingName(currentName)
  }

  const handleEdit = (id: number, newName: string) => {
    updateListNameInDb(id, newName)
    setLists(lists.map(list => list.id === id ? { ...list, name: newName } : list))
    setEditingId(null)
  }

  const handleRemove = (id: number) => {
    deleteListFromDb(id)
    setLists(lists.filter(list => list.id !== id))
  }

  const handleCreate = async () => {
    const newList = await createNewListInDb()
    const newExtendedList: ExtendedList = {
      ...newList,
      items: []
    }
    setLists([...lists, newExtendedList])
  }

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-secondary border-r border-border">
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Lists</h2>
            <ul className="space-y-2">
              {lists.map((list) => (
                <li key={list.id} className="flex items-center justify-between rounded-lg hover:bg-accent p-2">
                  {Number(editingId) === list.id ? (
                    <Input
                      value={editingName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingName(e.target.value)}
                      onBlur={() => handleEdit(list.id, editingName)}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          handleEdit(list.id, editingName)
                        }
                      }}
                      className="w-full"
                    />
                  ) : (
                    <Link href={`/list/${list.id}`} className="flex-grow text-foreground hover:underline">
                      {list.name}
                    </Link>
                  )}
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(list.id, list.name)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(list.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <Button onClick={handleCreate} className="w-full">
              Create New List
            </Button>
          </div>
        </ScrollArea>
      </nav>
    </div>
  )
}