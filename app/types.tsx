import { Vote as PrismaVote, Breed as PrismaBreed } from '@prisma/client'

export type DogResponse = {
    breed: string,
    subBreed: string[]
}

export type DogBreed = {
    id?: number,
    breed: string,
    subBreed: string,
    name: string,
    imageUrl: string
}

export type Vote = PrismaVote
export type Breed = PrismaBreed