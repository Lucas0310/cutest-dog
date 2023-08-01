import Card from './components/Card'
import { DogResponse, DogBreed } from './types'

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
  const displayName = subBreed ? `${subBreed} ${breed}` : dog.breed

  const slug = subBreed ? `${breed}/${subBreed}` : `${breed}`
  const response = await fetch(`https://dog.ceo/api/breed/${slug}/images/random`)
  const  image = await response.json()

  return { breed, subBreed, displayName, image: image.message } as DogBreed
}

const getDogsTuple = async () => {
  const breeds = await getAllBreeds()
  const [index1, index2] = getIndexTuple(breeds.length)
  const dog1 = await getDogBreedWithImage(breeds[index1])
  const dog2 = await getDogBreedWithImage(breeds[index2])

  return [dog1, dog2]
}

export default async function Home() {
  const [dog1, dog2] = await getDogsTuple()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Which dog is the cutest?
      <div className='flex justify-center items-center'>
        <Card dog={dog1} />
        <Card dog={dog2} />
      </div>
    </main>
  )
}
