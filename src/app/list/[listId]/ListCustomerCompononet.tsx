"use client"

import { Item, List } from '@prisma/client/edge';
import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { addItemServerSide, addItemToList, removeItemFromList } from '../serverComponent';

interface ShoppingListProps {
  list: List;
  currentItems: Item[];
  dbItems: Item[];
}

export default function ShoppingList({ list, currentItems, dbItems }: ShoppingListProps) {
  const [items, setItems] = useState<Item[]>([])
  const [allItems, setAllItems] = useState<Item[]>([])
  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    console.log("Initializing with items for listId: ", list.id)
    setItems(currentItems)
    setAllItems(dbItems)
  }, [list, currentItems, dbItems])

  const matchedItems = allItems.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase()) && !items.some(i => i.id === item.id)
  )

  const addItem = (item: Item) => {
    if (item && !items.some(i => i.id === item.id)) {
      setItems(prevItems => [...prevItems, item])
      if (!allItems.some(i => i.id === item.id)) {
        setAllItems(prevAllItems => [...prevAllItems, item])
      }
      setInputValue('')
      setShowDropdown(false)

      addItemToList(list.id, item.id)
    }
  }

  const addStringItem = async (itemName: string) => {
    const item = await addItemServerSide(itemName)
    addItem(item)
  }

  const removeItem = async (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
    await removeItemFromList(list.id, id)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setShowDropdown(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      addStringItem(inputValue.trim())
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
          {list.name}
        </h2>
        <ul className="space-y-2 mb-4 max-h-[60vh] overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex justify-between items-center bg-green-100 p-2 rounded-md`}
            >
              <span
                className="cursor-pointer flex-grow"
              >
                {item.name}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </li>
          ))}
        </ul>
        <div className="relative">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or add new item..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowDropdown(true)}
              className="flex-grow border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => addStringItem(inputValue.trim())}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          {showDropdown && matchedItems.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg"
            >
              {matchedItems.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addItem(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}