import Greeting from './components/Greeting'

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center text-center'>
      <h1 className='mb-4 text-3xl font-bold'>Welcome to Blog Admin!</h1>
      <Greeting />
    </main>
  )
}
