import { describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserPopover } from "./UserPopover.tsx";

describe("The User Popover", () => {
  const setUserId = vi.fn();

  afterEach(() => {
    setUserId.mockReset();
  });

  it("should open and close the popover", async () => {
    // given
    render(<UserPopover setUserId={setUserId} userId={"test user id"} />);

    // when
    await userEvent.click(screen.getByLabelText("user"));

    // then
    await waitFor(() =>
      expect(screen.getByText("Switch User ID")).toBeVisible(),
    );

    // when
    await userEvent.click(screen.getByText("Cancel"));

    // then
    await waitFor(() =>
      // check for visibility, as the closed popover is still part of the document
      expect(screen.queryByText("Switch User ID")).not.toBeVisible(),
    );
  });
});
