import Link from "next/link"
import { prisma } from "../utils/prisma"
import Image from 'next/image'

const getRanking = async () => {
    return prisma.vote.findMany(
        {
            include: { breed: true },
            orderBy: { votes: 'desc' }
        })
}

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
                {votes.map(vote => (
                    <tbody>
                        <tr className="text-center">
                            <td>
                                <Image
                                    src={vote.breed.imageUrl}
                                    alt={vote.breed.name}
                                    width={100} height={100}
                                    className="rounded-lg aspect-[1/1]" /></td>
                            <td className="capitalize">{vote.breed.name}</td>
                            <td>{vote.votes}</td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div >
    )
}