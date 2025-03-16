import { type NextRequest } from "next/server";

export interface PokemonItem {
  id: number;
  name: string;
}

function convertPokemonData(data: {
  pokemon: { name: string; url: string };
  slot: number;
}): PokemonItem {
  const { name, url } = data.pokemon;
  const id = parseInt(url.split("/").filter(Boolean).pop() || "0", 10); // Extracts ID from URL

  return { id, name };
}

function findCommonElements(arr1: PokemonItem[], arr2: PokemonItem[]) {
  const map = new Map(arr1.map((item) => [item.id, item])); // O(n)
  const result = arr2.filter((item) => map.has(item.id)); // O(m)

  console.log("===");

  console.log(result);

  return result;
}

export async function GET(request: NextRequest) {
  const a = await fetch("https://pokeapi.co/api/v2/type/water");
  const limit = 24;

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const page = searchParams.get("page") || "1";
  const offset = (Number(page) - 1) * limit;

  // query for /api/pokemon/list?page=3
  if (type === null || type === "") {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const data = await res.json();
    const list = data.results.map(convertPokemonData);
    // console.log(data);
    return Response.json({ total: data.count, list });
  } else {
    const typeArray = type.split(",");
    // console.log(typeArray);

    if (typeArray.length === 1) {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${typeArray[0]}`);
      const data = await res.json();

      // pagenation
      const total = data.pokemon.length;
      const list = data.pokemon;

      if (offset >= total) {
        return Response.json({ total, list: [] });
      } else {
        return Response.json({
          total,
          list: list.slice(offset, offset + limit).map(convertPokemonData),
        });
      }
    } else {
      // 依次调 /type/{typeName} 取合集

      const res = await Promise.all(
        typeArray.map((typeName) =>
          fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
        )
      );

      const data = await Promise.all(res.map((r) => r.json()));

      const list = data.reduce((acc, cur, curIndex) => {
        if (acc.length === 0) return [];

        return findCommonElements(
          curIndex === 1 ? acc.pokemon.map(convertPokemonData) : acc,
          cur.pokemon.map(convertPokemonData)
        );
      });

      const total = list.length;

      if (offset >= total) {
        return Response.json({ total, list: [] });
      } else {
        return Response.json({
          total,
          list: list.slice(offset, offset + limit),
        });
      }
    }
  }
}
