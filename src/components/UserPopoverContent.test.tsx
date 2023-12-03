import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserPopoverContent } from "./UserPopoverContent.tsx";

describe("The User Popover Content", () => {
  const closePopover = vi.fn();
  const setUserId = vi.fn();
  const userId = "test user id";

  afterEach(() => {
    closePopover.mockReset();
    setUserId.mockReset();
  });

  it("shows the explanations", () => {
    // given
    render(
      <UserPopoverContent
        closePopover={closePopover}
        setUserId={setUserId}
        userId={userId}
      />,
    );

    // then
    expect(
      screen.getByText("is your login data", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText("Beware", { exact: false })).toBeInTheDocument();
  });

  it("copies the current user id to the clipboard", async () => {
    // given
    render(
      <UserPopoverContent
        closePopover={closePopover}
        setUserId={setUserId}
        userId={userId}
      />,
    );

    const user = userEvent.setup();

    // when
    await user.click(screen.getByLabelText("copy"));

    // then
    expect(screen.getByText("Copied to clipboard")).toBeInTheDocument();

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe(userId);
  });

  it("switches to another user id", async () => {
    // given
    render(
      <UserPopoverContent
        closePopover={closePopover}
        setUserId={setUserId}
        userId={userId}
      />,
    );
    const newUserId = "another ID";

    // when
    const newUserIdField = screen.getByLabelText("New User ID");
    await userEvent.type(newUserIdField, newUserId);

    await userEvent.click(screen.getByText("Save"));

    // then
    expect(closePopover).toHaveBeenCalled();
    expect(setUserId).toHaveBeenCalledWith(newUserId);
  });
});
