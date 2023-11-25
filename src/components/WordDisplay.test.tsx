import { WordDisplay } from "./WordDisplay.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 as uuid } from "uuid";

describe("Word Display", () => {
  const exampleEntity = { id: uuid(), example: "some example" };
  const wordEntity = {
    id: uuid(),
    word: "my word",
    source: "some source",
    translation: "some translation",
    date_added: "2023-01-01T15:30:00+00:00",
    examples: [exampleEntity],
  };

  const editWord = vi.fn();
  const deleteWord = vi.fn();
  const addExample = vi.fn();
  const deleteExample = vi.fn();

  beforeEach(() => {
    render(
      <WordDisplay
        word={wordEntity}
        editWord={editWord}
        deleteWord={deleteWord}
        addExample={addExample}
        deleteExample={deleteExample}
      />,
    );
  });

  afterEach(() => {
    editWord.mockReset();
    deleteWord.mockReset();
    addExample.mockReset();
    deleteExample.mockReset();
  });

  it("should display the word", () => {
    expect(screen.getByText(wordEntity.word)).toBeInTheDocument();
    expect(screen.getByText(wordEntity.source)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(wordEntity.date_added).toLocaleDateString()),
    ).toBeInTheDocument();
  });

  it("should display the translation after clicking on the eye icon", async () => {
    expect(screen.queryByText(wordEntity.translation)).not.toBeInTheDocument();

    // when
    await userEvent.click(screen.getByLabelText("eye"));

    // then
    expect(screen.getByText(wordEntity.translation)).toBeInTheDocument();
  });

  it("should display the examples after clicking on the book icon", async () => {
    expect(screen.queryByText(exampleEntity.example)).not.toBeInTheDocument();

    // when
    await userEvent.click(screen.getByLabelText("read"));

    // then
    expect(screen.getByText(exampleEntity.example)).toBeInTheDocument();
  });

  it("should delete the example", async () => {
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

  it("should add another example", async () => {
    // when
    await userEvent.click(screen.getByLabelText("plus-circle"));

    // then
    const addExampleInput = await screen.findByRole("textbox");

    // when
    await userEvent.type(addExampleInput, "another example");
    await userEvent.click(screen.getByText("Save"));

    // then
    expect(addExample).toHaveBeenCalledWith(wordEntity.id, "another example");
  });

  it("should go into edit mode", async () => {
    // when
    await userEvent.click(screen.getByLabelText("edit"));

    // then
    ["Word", "Translation", "Source"].forEach((label) =>
      expect(screen.getByLabelText(label)).toBeInTheDocument(),
    );
    ["Cancel", "Save"].forEach((label) =>
      expect(screen.getByText(label)).toBeInTheDocument(),
    );

    // when
    await userEvent.click(screen.getByText("Save"));

    // then
    expect(editWord).toHaveBeenCalled();
  });

  it("should delete the word", async () => {
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
