import { render, screen } from "@testing-library/react";
import Button from "../../components/core/Button";
import { describe, expect, test } from "vitest";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button>Testing</Button>);
    const buttonElement = screen.getByRole("button"); // prints out the jsx in the App component unto the command line
    expect(buttonElement).toBeInTheDocument();
  });
});
