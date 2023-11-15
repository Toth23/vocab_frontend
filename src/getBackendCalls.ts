import {KeyedMutator} from "swr/_internal";
import {AppState, Word, WordUpdate} from "./types.ts";


export const getBackendCalls = (data: AppState, mutate: KeyedMutator<AppState>) => {
  const addWord = async (word: string, translation?: string, source?: string, examples?: string[]) => {
    const payload = {word, translation: translation ?? null, source: source ?? null, examples};
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
  const editWord = async (wordUpdate: WordUpdate) => {
    const payload = {word: wordUpdate.word, translation: wordUpdate.translation, source: wordUpdate.source};
    await fetch(`http://localhost:3000/api/vocab/${wordUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    await mutate({
      ...data, words: data.words.map((w: Word) => w.id === wordUpdate.id ? {...w, ...wordUpdate} : w)
    })
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

  return {addWord, editWord, deleteWord, addExample, deleteExample}
}