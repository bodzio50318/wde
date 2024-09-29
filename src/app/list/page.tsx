import Link from "next/link";
import CreateList from "./CreateListButton";
import { getAllList } from "./serverComponent";

export default async function Lists() {
  const lists = await getAllList()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h1>Lists</h1>
      <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: '600px' }}>
        {lists.map((list) => (
          <li key={list.id} style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Link href={`/list/${list.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {list.name}
            </Link>
          </li>
        ))}
      </ul>
      <CreateList />
    </div>
  );
}