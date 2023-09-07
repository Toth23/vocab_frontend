import './App.css'
import useSWR from 'swr'

interface Example {
  id: number;
  example: string;
}
interface Word {
  id: number;
  word: string;
  translation?: string;
  source?: string;
  examples: Example[];
}

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
        {data.words.map(({ id, word, translation, source }: Word) => (
          <div key={id}>
            <div>{word}</div>
            <div>{translation}</div>
            <div>{source}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
