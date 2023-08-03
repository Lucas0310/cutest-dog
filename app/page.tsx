import { revalidatePath } from 'next/cache'
import { handleVote } from './actions'
import Card from './components/Card'
import { DogResponse, DogBreed } from './types'
import { prisma } from './utils/prisma'
import Link from 'next/link'
import Loading from './loading'

const getAllBreeds = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all')
  const breeds = await response.json()
  const parsedBreeds = Object.entries(breeds.message).map(([breed, subBreed]) => ({
    breed,
    subBreed,
  }));

  return parsedBreeds as DogResponse[]
}

const getIndexTuple = (breedsLength: number) => {
  const getRandomIndex = () => Math.floor(Math.random() * (breedsLength - 1))
  const firstIndex = getRandomIndex()
  let secondIndex = getRandomIndex()

  while (firstIndex == secondIndex) {
    secondIndex = getRandomIndex()
  }
  return [firstIndex, secondIndex]
}

const getDogBreedWithImage = async (dog: DogResponse) => {
  const breed = dog.breed
  const subBreed = dog.subBreed.length > 0 ? dog.subBreed[Math.floor(Math.random() * dog.subBreed.length)] : null
  const name = subBreed ? `${subBreed} ${breed}` : dog.breed
  const dbBreed = await prisma.breed.findFirst({ where: { name } })

  if (dbBreed) {
    return dbBreed as DogBreed
  }

  const slug = subBreed ? `${breed}/${subBreed}` : `${breed}`
  const response = await fetch(`https://dog.ceo/api/breed/${slug}/images/random`)
  const image = await response.json()

  return { breed, subBreed, name, imageUrl: image.message } as DogBreed
}

const getDogsTuple = async () => {
  const breeds = await getAllBreeds()
  const [index1, index2] = getIndexTuple(breeds.length)
  const dog1 = await getDogBreedWithImage(breeds[index1])
  const dog2 = await getDogBreedWithImage(breeds[index2])

  return [dog1, dog2]
}

const voteHandler = async (dog: DogBreed) => {
  'use server'
  await handleVote(dog)
  revalidatePath('/')
}

export default async function Home() {
  const [dog1, dog2] = await getDogsTuple()

  if(!dog1 || !dog2) return <Loading/>
  return (
    <main>
      <h1 className='text-center'>Which dog is the cutest?</h1>
      <div className='flex justify-center items-center'>
        <Card {...{ dog: dog1, voteHandler }} />
        <Card {...{ dog: dog2, voteHandler }} />
      </div>
      <div className='flex items-center justify-center'>
        <Link className='p-2 bg-rose-600 rounded-lg hover:bg-slate-200' href={'/ranking'}>Ranking</Link>
      </div>
    </main>
  )
}
