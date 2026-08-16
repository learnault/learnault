import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GlobalNav from "@/components/landing/global-nav";

describe("GlobalNav", () => {
  it("opens the mobile drawer and closes it on Escape", () => {
    render(<GlobalNav />);

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    fireEvent.click(toggle);

    const drawer = screen.getByRole("dialog", { name: /site navigation/i });
    expect(drawer).toBeInTheDocument();
    expect(within(drawer).getByRole("button", { name: /start learning/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: /site navigation/i })).not.toBeInTheDocument();
  });
});
