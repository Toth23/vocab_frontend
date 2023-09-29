import { useState } from 'react';

interface NewWordProps {
    addWord: (word: string, translation?: string, source?: string) => void;
}


export const NewWord = ({ addWord }: NewWordProps) => {

    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [source, setSource] = useState('');

    return (
        <div className="newWordRow">
            <label>
                Word:
                <input name="word" value={word} onChange={e => setWord(e.target.value)}></input>
            </label>
            <label>
                Translation:
                <input name="translation" value={translation} onChange={e => setTranslation(e.target.value)}></input>
            </label>
            <label>
                Source:
                <input name="source" value={source} onChange={e => setSource(e.target.value)}></input>
            </label>
            <button onClick={() => {
                addWord(word, translation, source);
                setWord('');
                setTranslation('');
            }}>Add word</button>
        </div>
    )
}