import './App.css'
import useSWR from 'swr'
import { Word } from './types';
import { WordDisplay } from './WordDisplay';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const { data, error, isLoading } = useSWR('http://localhost:3000/api/vocab', fetcher)

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  console.log(data.words)

  return (
    <>
      <h1>My Chinese Words</h1>
      <div className="wordlist">
        {data.words.map((word: Word) => (
          <WordDisplay word={word} />
        ))}
      </div>
    </>
  )
}

export default App
