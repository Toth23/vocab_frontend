import {WordDisplay} from "./WordDisplay.tsx";
import {render, screen} from "@testing-library/react";
import {Word} from "./types.ts";

describe('Word Display', () => {
  it('should display the word', () => {
    // given
    const wordEntity: Word = {
      id: 123,
      word: "my word",
      source: "some source",
      translation: "some translation",
      date_added: "01.01.2023",
      examples: [],
    };
    const editWord = jest.fn();
    const deleteWord = jest.fn();
    const addExample = jest.fn();
    const deleteExample = jest.fn();

    // when
    render(<WordDisplay word={wordEntity}
                        editWord={editWord}
                        deleteWord={deleteWord}
                        addExample={addExample}
                        deleteExample={deleteExample}/>)

    // then
    expect(screen.getByText(wordEntity.word)).toBeInTheDocument()
  });
});
