import {WordDisplay} from "./WordDisplay.tsx";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe('Word Display', () => {
  const exampleEntity = {id: 456, example: "some example"};
  const wordEntity = {
    id: 123,
    word: "my word",
    source: "some source",
    translation: "some translation",
    date_added: "01.01.2023",
    examples: [exampleEntity],
  };

  const editWord = jest.fn();
  const deleteWord = jest.fn();
  const addExample = jest.fn();
  const deleteExample = jest.fn();

  beforeEach(() => {
    render(<WordDisplay word={wordEntity}
                        editWord={editWord}
                        deleteWord={deleteWord}
                        addExample={addExample}
                        deleteExample={deleteExample}/>);
  });

  it('should display the word', () => {
    expect(screen.getByText(wordEntity.word)).toBeInTheDocument();
    expect(screen.getByText(wordEntity.source)).toBeInTheDocument();
    expect(screen.getByText(wordEntity.date_added)).toBeInTheDocument();
  });

  it('should display the translation after clicking on the eye icon', async () => {
    expect(screen.queryByText(wordEntity.translation)).not.toBeInTheDocument();

    // when
    await userEvent.click(screen.getByLabelText("eye"));

    // then
    expect(screen.getByText(wordEntity.translation)).toBeInTheDocument();
  });

  it('should display the examples after clicking on the book icon', async () => {
    expect(screen.queryByText(exampleEntity.example)).not.toBeInTheDocument();

    // when
    await userEvent.click(screen.getByLabelText("read"));

    // then
    expect(screen.getByText(exampleEntity.example)).toBeInTheDocument();
  });

  it('should delete the example', async () => {
    // when
    await userEvent.click(screen.getByLabelText("read"));

    const deleteExampleBtn = screen.getAllByLabelText("delete")[1];
    await userEvent.hover(deleteExampleBtn);

    // then
    expect(await screen.findByText("Delete example")).toBeInTheDocument();

    // when
    await userEvent.click(deleteExampleBtn);

    // then
    expect(deleteExample).toHaveBeenCalledWith(wordEntity.id, exampleEntity.id);
  });

  it('should add another example', async () => {
    // when
    await userEvent.click(screen.getByLabelText("plus-circle"));

    // then
    const addExampleInput = await screen.findByRole('textbox');

    // when
    await userEvent.type(addExampleInput, "another example");
    await userEvent.click(screen.getByText("Save"));

    // then
    expect(addExample).toHaveBeenCalledWith(wordEntity.id, "another example");
  });

  it('should delete the word', async () => {
    // when
    const deleteWordBtn = screen.getAllByLabelText("delete")[0];
    await userEvent.click(deleteWordBtn);

    // then
    expect(await screen.findByText("Delete this word")).toBeInTheDocument();

    // when
    await userEvent.click(screen.getByText("Yes"));

    // then
    expect(deleteWord).toHaveBeenCalledWith(wordEntity.id);
  });
});
