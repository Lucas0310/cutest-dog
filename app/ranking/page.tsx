import { prisma } from "../utils/prisma"
import Image from 'next/image'
import { cache } from 'react'

export const revalidate = 5 * 60

const getRanking = cache(async () => {
    return prisma.vote.findMany(
        {
            include: { breed: true },
            orderBy: { votes: 'desc' }
        })
})

export default async function Ranking() {
    const votes = await getRanking()
    return (
        <div>
            <table className="border-separate border-spacing-14">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Breed</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {votes.map(vote => (
                        <tr key={vote.id} className="text-center">
                            <td>
                                <Image
                                    src={vote.breed.imageUrl}
                                    alt={vote.breed.name}
                                    width={100} height={100}
                                    className="rounded-lg aspect-[1/1]" /></td>
                            <td className="capitalize">{vote.breed.name}</td>
                            <td>{vote.votes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}