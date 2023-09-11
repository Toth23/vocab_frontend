import { Example, Word } from './types';
import { useState } from 'react';

interface WordDisplayProps {
    word: Word;
    deleteWord: (wordId: number) => void;
}

export const WordDisplay = ({ word: word_entity, deleteWord }: WordDisplayProps) => {

    const [showExamples, setShowExamples] = useState(false)

    const toggleExamples = () => setShowExamples(current => !current);

    const { id, word, translation, source, examples } = word_entity;

    return (
        <>
            <div className="word-item" key={id}>
                <div>{word}</div>
                <div>{translation}</div>
                <div>{source}</div>
                <button onClick={toggleExamples}>Show examples</button>
                <button onClick={() => { deleteWord(word_entity.id) }}>Delete</button>
            </div>
            {showExamples ? (
                <ul>
                    {examples.map((example: Example) => (
                        <li key={example.id}>{example.example}</li>
                    ))}
                    <li key="new"><button>Add example</button></li>
                </ul>
            ) : null
            }
        </>
    )
}
