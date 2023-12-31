import { render, screen } from "@testing-library/react";
import { EditWord } from "./EditWord.tsx";
import userEvent from "@testing-library/user-event";
import { v4 as uuid } from "uuid";

describe("Edit Word", () => {
  const wordEntity = {
    id: uuid(),
    word: "word",
    source: "source",
    translation: "translation",
    date_added: "2023-01-01T15:30:00+00:00",
    examples: [],
  };
  const save = vi.fn();
  const reset = vi.fn();

  afterEach(() => {
    save.mockReset();
    reset.mockReset();
  });

  it("should edit and save the word", async () => {
    // given
    render(<EditWord save={save} reset={reset} wordEntity={wordEntity} />);

    // when
    const wordField = screen.getByLabelText("Word");
    const translationField = screen.getByLabelText("Translation");
    const sourceField = screen.getByLabelText("Source");

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

  it("should cancel", async () => {
    // given
    render(<EditWord save={save} reset={reset} wordEntity={wordEntity} />);

    // when
    await userEvent.click(screen.getByText("Cancel"));

    // then
    expect(reset).toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });
});
