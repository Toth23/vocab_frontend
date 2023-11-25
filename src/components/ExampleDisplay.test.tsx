import { render, screen } from "@testing-library/react";
import { ExampleDisplay } from "./ExampleDisplay.tsx";
import userEvent from "@testing-library/user-event";
import { v4 as uuid } from "uuid";

describe("Example Display", () => {
  const wordId = uuid();
  const examples = [
    { example: "ex 1", id: uuid() },
    { example: "ex 2", id: uuid() },
  ];
  const deleteExample = vi.fn();

  afterEach(() => {
    deleteExample.mockReset();
  });

  it("should display examples", () => {
    // when
    render(
      <ExampleDisplay
        wordId={wordId}
        examples={examples}
        showExamples={true}
        deleteExample={deleteExample}
      />,
    );

    // then
    expect(screen.getByText(examples[0].example)).toBeInTheDocument();
    expect(screen.getByText(examples[1].example)).toBeInTheDocument();
  });

  it("should not show examples if showExamples is false", () => {
    // when
    render(
      <ExampleDisplay
        wordId={wordId}
        examples={examples}
        showExamples={false}
        deleteExample={deleteExample}
      />,
    );

    // then
    expect(screen.queryByText(examples[0].example)).not.toBeInTheDocument();
    expect(screen.queryByText(examples[1].example)).not.toBeInTheDocument();
  });

  it("should show a placeholder if no examples are provided", () => {
    // when
    render(
      <ExampleDisplay
        wordId={wordId}
        examples={[]}
        showExamples={true}
        deleteExample={deleteExample}
      />,
    );

    // then
    expect(screen.getByText("no examples")).toBeInTheDocument();
  });

  it("should delete an example", async () => {
    // when
    render(
      <ExampleDisplay
        wordId={wordId}
        examples={examples}
        showExamples={true}
        deleteExample={deleteExample}
      />,
    );

    // then
    const deleteExampleBtns = screen.getAllByLabelText("delete");

    expect(deleteExampleBtns).toHaveLength(2);

    // when
    await userEvent.click(deleteExampleBtns[0]);

    // then
    expect(deleteExample).toHaveBeenCalledWith(wordId, examples[0].id);
  });
});
