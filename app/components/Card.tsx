'use client'
import { DogBreed } from "../types"
import Image from 'next/image'
import { useTransition } from 'react'
import Loading from "../loading"

type CardProps = {
    dog: DogBreed,
    voteHandler: (dog: DogBreed) => void
}

const Card: React.FC<CardProps> = ({dog, voteHandler}) => {
    let [isPending, startTransition] = useTransition()
    const { name, imageUrl, } = dog

    if(isPending) return <Loading/>

    return (
        <div className='capitalize flex flex-col items-center justify-center m-5'>
            <h2>
                {name}
            </h2>
            <div className='rounded-lg m-5 border border-amber-200'>
                <div>
                    <Image className='aspect-[1/1] rounded-lg'
                     src={imageUrl} alt={`${name} dog`} width={200} height={200} priority />
                </div>
            </div>
            <button className='p-2 bg-slate-500 rounded-lg hover:bg-amber-200'
             onClick={() => startTransition(() => voteHandler(dog))}>This one</button>
        </div >
    )
}

export default Card