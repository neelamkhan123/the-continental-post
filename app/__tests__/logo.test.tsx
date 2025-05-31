import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logo from "../components/ui/logo";

describe("Logo Component", () => {
  test("renders without error", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const image = screen.getAllByAltText("Earth");
    expect(image).toBeInTheDocument;
  });

  test("render correct text", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByText("The")).toBeInTheDocument();
    expect(screen.getByText("Continental Post")).toBeInTheDocument();
  });

  test("links to the homepage", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
