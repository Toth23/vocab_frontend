import './App.css'
import useSWR from 'swr'
import {Word} from './types';
import {NewWordModal} from './NewWordModal.tsx';
import {WordDisplay} from "./WordDisplay.tsx";
import {Button, Layout, Tooltip} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const {data, error, isLoading, mutate} = useSWR('http://localhost:3000/api/vocab', fetcher)

  const [isNewWordModalOpen, setIsNewWordModalOpen] = useState(false);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  const addWord = async (word: string, translation?: string, source?: string) => {
    const payload = {word, translation: translation ?? null, source: source ?? null};
    const response = await fetch('http://localhost:3000/api/vocab', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const responseJson = await response.json();
    await mutate({...data, words: [...data.words, responseJson.word]})
  }
  const deleteWord = async (wordId: number) => {
    await fetch(`http://localhost:3000/api/vocab/${wordId}`, {method: 'DELETE'})
    await mutate({...data, words: data.words.filter((w: Word) => w.id !== wordId)})
  }
  const addExample = async (wordId: number, example: string) => {
    const payload = {example};
    const response = await fetch(`http://localhost:3000/api/vocab/${wordId}/examples`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const responseJson = await response.json();
    await mutate({
      ...data, words: data.words.map((w: Word) => w.id === wordId ? w :
        {...w, examples: [...w.examples, responseJson]})
    })
  }
  const deleteExample = async (wordId: number, exampleId: number) => {
    await fetch(`http://localhost:3000/api/vocab/${wordId}/examples/${exampleId}`, {
      method: 'DELETE',
    })
    await mutate({
      ...data, words: data.words.map((w: Word) => w.id === wordId ? w :
        {...w, examples: w.examples.filter(e => e.id !== exampleId)})
    })
  }

  return (
    <Layout>
      <Layout.Header>
        <Tooltip title={"Add new word"}>
          <Button shape={"circle"} size={"large"} icon={<PlusOutlined/>} onClick={() => setIsNewWordModalOpen(true)}/>
        </Tooltip>
      </Layout.Header>
      <div className="wordlist">
        {data.words.map((word: Word) => (
          <WordDisplay
            word={word}
            key={word.id}
            deleteWord={deleteWord}
            addExample={addExample}
            deleteExample={deleteExample}
          />
        ))}
      </div>
      <NewWordModal addWord={addWord} isModalOpen={isNewWordModalOpen} onModalClose={() => setIsNewWordModalOpen(false)}/>
    </Layout>
  )
}

export default App
