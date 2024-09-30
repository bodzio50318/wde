import { getAllListsFromDb } from "../serverComponent"
import ListManager from "./ListManager"

export default async function ListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lists = await getAllListsFromDb()
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <ListManager listOflists={lists} />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}