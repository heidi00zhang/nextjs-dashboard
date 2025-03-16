export const dynamic = "force-static";

export async function GET() {
  const data = await fetch("https://pokeapi.co/api/v2/type?limit=50");
  const posts = await data.json();

  const res = posts.results.map(({ name }: { name: string }) => {
    return name;
  });

  return Response.json(res);
}
