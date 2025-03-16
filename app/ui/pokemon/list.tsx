import { PokemonItem } from '@/app/api/pokemon/list/route'
import Image from 'next/image'


export default async function List(props: { query: string }) {
  const { total, list } = await fetch(`http://localhost:3000/api/pokemon/list?${props.query}`).then(res => res.json())

  return (
    <div>
      <p className="mt-8 mb-8 font-bold text-red-500">
        Total: {total}
      </p>
      <section className="grid grid-cols-6 gap-x-16 gap-y-6">
        {list.map((item: PokemonItem) => {
          return (
            <div key={item.id} className="flex flex-col items-center justify-between border p-4">
              <h3 className="text-green-500 italic">{item.name}</h3>
              <Image
                loading='lazy'
                width={100}
                height={100}
                alt={item.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} />
              <p className="text-sm text-gray-500">
                Number:{item.id}
              </p>
            </div>

          )
        })}
      </section>
    </div>

  )
}