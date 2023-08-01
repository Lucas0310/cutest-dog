'use client'
import { DogBreed } from "../types"
import Image from 'next/image'
import { handleVote } from '../actions'
import { useTransition } from 'react'

const Card = ({ dog }: { dog: DogBreed }) => {
    let [isPending, startTransition] = useTransition()
    const { displayName, image, } = dog
    return (
        <div className='flex flex-col items-center justify-center m-5'>
            <h2>
                {displayName}
            </h2>
            <div className='rounded-lg m-5 p-0.5 bg-slate-500'>
                <div className='relative h-60 w-60'>
                    <Image className='object-cover rounded-lg' src={image} alt={`${displayName} dog`} fill />
                </div>
            </div>
            <button className='bg-slate-500 rounded-lg w-full'
             onClick={() => startTransition(() => handleVote(displayName))}>This one</button>
        </div >
    )
}

export default Card