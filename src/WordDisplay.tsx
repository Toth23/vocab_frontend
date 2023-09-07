import { Example, Word } from './types';
import { useState } from 'react';

export const WordDisplay = ({ word: word_entity }: { word: Word }) => {

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
            </div>
            {showExamples ? (
                <ul>
                    {examples.map((example: Example) => (
                        <li>{example.example}</li>
                    ))}
                </ul>
                ) : null
            }
        </>
    )
}
