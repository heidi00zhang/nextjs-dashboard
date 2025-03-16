import { Suspense } from "react"
import TypeFilter from "../ui/pokemon/filter"
import List from "../ui/pokemon/list";

export default async function Page(Props: {
  searchParams?: Promise<{ type?: string; page?: string }>;
}) {
  const typePromise: Promise<string[]> = fetch('http://localhost:3000/api/pokemon/type').then(res => res.json())

  const searchParams = await Props.searchParams; // 把一些轻量级的数据提前加载完成
  const queryString = new URLSearchParams(searchParams).toString();
  console.log(queryString);

  return (
    <main>
      <p className="py-4 text-center">欢迎来到宝可梦世界</p>
      <Suspense fallback={<div>loading...</div>}>
        <TypeFilter typePromise={typePromise} />
      </Suspense>
      <Suspense key={queryString} fallback={<div>loading pokemon list...</div>}>
        <List query={queryString} />
      </Suspense>
      {/* <Pagination /> */}
    </main>
  )
}