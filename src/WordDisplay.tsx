import { Example, Word } from './types';
import { useState } from 'react';

interface WordDisplayProps {
    word: Word;
    deleteWord: (wordId: number) => void;
    addExample: (wordId: number, example: string) => void;
    deleteExample: (wordId: number, exampleId: number) => void;
}

export const WordDisplay = ({ word: word_entity, deleteWord, addExample, deleteExample }: WordDisplayProps) => {

    const [showExamples, setShowExamples] = useState(false)
    const [newExampleInput, setNewExampleInput] = useState('')

    const toggleExamples = () => setShowExamples(current => !current);

    const { id, word, translation, source, examples } = word_entity;

    return (
        <>
            <div className="word-item" key={id}>
                <div>{word}</div>
                <div>{translation}</div>
                <div>{source}</div>
                <button onClick={toggleExamples}>Show examples</button>
                <button onClick={() => { deleteWord(id) }}>Delete</button>
            </div>
            {showExamples ? (
                <ul>
                    {examples.map((example: Example) => (
                        <li key={example.id}>
                            <div>{example.example}</div>
                            <button onClick={() => deleteExample(id, example.id)}>Delete example</button>
                        </li>
                    ))}
                    <li key="new">
                        <input value={newExampleInput} onChange={e => setNewExampleInput(e.target.value)} />
                        <button disabled={newExampleInput.length === 0} onClick={() => {
                            addExample(id, newExampleInput)
                            setNewExampleInput('')
                        }}>Add example</button>
                    </li>
                </ul>
            ) : null
            }
        </>
    )
}
