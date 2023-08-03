'use server'
import { DogBreed } from "./types"
import { prisma } from "./utils/prisma"

export const handleVote = async (dog: DogBreed) => {
    const upsertVote = async (breedId: number) => {
        await prisma.vote.upsert({
            where: { breedId },
            create: { votes: 1, breedId },
            update: { votes: { increment: 1 } }
        })
    }

    if (dog.id) {
        upsertVote(dog.id)
    } else {
        const breed = await prisma.breed.upsert({
            where: { name: dog.name },
            create: { imageUrl: dog.imageUrl, name: dog.name },
            update: {}
        })

        upsertVote(breed.id)
    }
}

// export const getRanking = async() => {
//     const votes = await prisma.vote.findMany()
//     return votes.map(vote => ({breed: vote.dogBreed, di}))