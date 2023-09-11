import './App.css'
import useSWR from 'swr'
import { Word } from './types';
import { WordDisplay } from './WordDisplay';
import { NewWord } from './NewWord';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const { data, error, isLoading, mutate } = useSWR('http://localhost:3000/api/vocab', fetcher)

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  const addWord = async (word: string, translation?: string, source?: string) => {
    const payload = { word, translation: translation || null, source: source || null };
    const response = await fetch('http://localhost:3000/api/vocab', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const responseJson = await response.json();
    console.log(responseJson)
    mutate({ ...data, words: [...data.words, responseJson.word] })
  }

  return (
    <>
      <h1>My Chinese Words</h1>
      <div className="wordlist">
        {data.words.map((word: Word) => (
          <WordDisplay word={word} key={word.id} />
        ))}
      </div>
      <NewWord addWord={addWord} />
    </>
  )
}

export default App
