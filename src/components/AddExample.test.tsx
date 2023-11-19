import {render, screen} from "@testing-library/react";
import {AddExample} from "./AddExample.tsx";
import userEvent from "@testing-library/user-event";

describe('Edit Word', () => {
  const wordId = 123;
  const addExample = vi.fn();

  afterEach(() => {
    addExample.mockReset();
  });

  it('should edit and save the word', async () => {
    // given
    render(<AddExample addExample={addExample} wordId={wordId}/>);

    // when
    await userEvent.click(screen.getByLabelText("plus-circle"));
    const addExampleInput = await screen.findByRole('textbox');

    await userEvent.type(addExampleInput, "new example");
    await userEvent.click(screen.getByText("Save"));

    // then
    expect(addExample).toHaveBeenCalledWith(wordId, "new example");
  });

  it('should cancel', async () => {
    // given
    render(<AddExample addExample={addExample} wordId={wordId}/>);

    // when
    await userEvent.click(screen.getByLabelText("plus-circle"));
    await userEvent.click(screen.getByText("Cancel"));

    // then
    expect(addExample).not.toHaveBeenCalled();
  });
});
