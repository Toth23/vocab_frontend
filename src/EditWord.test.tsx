import {render, screen} from "@testing-library/react";
import {EditWord} from "./EditWord.tsx";
import userEvent from "@testing-library/user-event";

describe('Edit Word', () => {
  const wordEntity = {
    id: 123,
    word: "word",
    source: "source",
    translation: "translation",
    date_added: "01.01.2023",
    examples: [],
  };
  const save = jest.fn();
  const reset = jest.fn();

  afterEach(() => {
    save.mockReset();
    reset.mockReset();
  });

  it('should edit and save the word', async () => {
    // given
    render(<EditWord save={save} reset={reset} wordEntity={wordEntity}/>);

    // when
    const wordField = screen.getByLabelText('Word');
    const translationField = screen.getByLabelText('Translation');
    const sourceField = screen.getByLabelText('Source');

    await userEvent.type(wordField, " changed");
    await userEvent.type(translationField, " changed");
    await userEvent.type(sourceField, " changed");

    await userEvent.click(screen.getByText("Save"));

    // then
    const expectedWordUpdate = {
      id: wordEntity.id,
      word: "word changed",
      translation: "translation changed",
      source: "source changed",
    };
    expect(save).toHaveBeenCalledWith(expectedWordUpdate);
  });

  it('should cancel', async () => {
    // given
    render(<EditWord save={save} reset={reset} wordEntity={wordEntity}/>);

    // when
    await userEvent.click(screen.getByText("Cancel"));

    // then
    expect(reset).toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });
});
