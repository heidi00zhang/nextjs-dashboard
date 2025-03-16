'use client';

import { use, useCallback, useEffect, useState } from 'react';
import useDebounce from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TypeFilter(props: { typePromise: Promise<string[]> }) {
  const messageContent = use(props.typePromise);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const seletedTypes = searchParams.get("type")?.split(",") || [];
  const [seleted, setSelected] = useState(seletedTypes);

  const updateUrl = useCallback((types: string[], searchParams: string, pathname: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (types.length !== 0) {
      params.set("type", types.join(","));
    } else {
      params.delete("type");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [])
  const debouncedUpdateUrl = useDebounce(updateUrl, 1000);

  const handleSearch = useCallback((term: string) => {
    if (seleted.includes(term)) {
      const newSelected = seleted.filter(typeName => typeName !== term);

      setSelected(newSelected)
      debouncedUpdateUrl(newSelected, searchParams.toString(), pathname);
    } else {
      const newSelected = [...seleted, term];

      setSelected(newSelected)
      debouncedUpdateUrl(newSelected, searchParams.toString(), pathname);
    }
  }, [seleted]);

  return (
    <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span>Types:</span>
      {
        messageContent.map(typeName => <button key={typeName} className={`border p-2 ${seleted.includes(typeName) ? "bg-blue-500" : ""}`} onClick={() => handleSearch(typeName)}> {typeName}</button>)
      }
    </section >
  )
}


