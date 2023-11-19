import {describe} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {NewWordModal} from "./NewWordModal.tsx";

describe("The NewWordModal", () => {
  const addWord = vi.fn();
  const closeModal = vi.fn();

  afterEach(() => {
    addWord.mockReset();
    closeModal.mockReset();
  });

  it('should create a word with examples', async () => {
    // given
    render(<NewWordModal addWord={addWord} closeModal={closeModal} isModalOpen={true}/>);

    // when
    const wordField = screen.getByLabelText('Word');
    const translationField = screen.getByLabelText('Translation');
    const sourceField = screen.getByLabelText('Source');

    await userEvent.type(wordField, "some word");
    await userEvent.type(translationField, "some translation");
    await userEvent.type(sourceField, "some source");

    const example1Field = screen.getByLabelText('Example 1');
    await userEvent.type(example1Field, "example 1");

    await userEvent.click(screen.getByLabelText("plus-circle"));

    const example2Field = screen.getByLabelText('Example 2');
    await userEvent.type(example2Field, "example 2");

    await userEvent.click(screen.getByText("Save"));

    // then
    const expectedWordCreation = {
      word: "some word",
      translation: "some translation",
      source: "some source",
      examples: ["example 1", "example 2"]
    };
    expect(addWord).toHaveBeenCalledWith(expectedWordCreation);
    expect(closeModal).toHaveBeenCalled();
  });

  it('should create a word and check "Create another"', async () => {
    // given
    render(<NewWordModal addWord={addWord} closeModal={closeModal} isModalOpen={true}/>);

    // when
    const wordField = screen.getByLabelText('Word');
    await userEvent.type(wordField, "some word");

    await userEvent.click(screen.getByLabelText("Create another"));
    await userEvent.click(screen.getByText("Save"));

    // then
    const expectedWordCreation = {
      word: "some word",
      examples: []
    };
    expect(addWord).toHaveBeenCalledWith(expectedWordCreation);

    expect(closeModal).not.toHaveBeenCalled();
    expect(wordField.textContent).toBe('');
  });
});
