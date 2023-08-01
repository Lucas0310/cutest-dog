'use server'
import { prisma } from "./utils/prisma"

export const handleVote = async (dog: string) => {
    await prisma.vote.upsert({
        where: { dogBreed: dog },
        create: { votes: 1, dogBreed: dog },
        update: { votes: { increment: 1 } }
    })
}