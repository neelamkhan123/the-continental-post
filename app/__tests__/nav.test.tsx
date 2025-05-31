import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as firebaseAuth from "firebase/auth";
import Nav from "~/components/header/nav";

// Mock Firebase methods
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

// Optionally mock Logo to isolate this test
jest.mock("../components/ui/logo", () => () => (
  <div data-testid="logo">Logo</div>
));

describe("Nav Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders nav with logo and guest links when user is not authenticated", async () => {
    const mockOnAuthStateChanged = firebaseAuth.onAuthStateChanged as jest.Mock;

    // Simulate no user logged in
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Discover")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
  });

  test("renders nav with user links when user is authenticated", async () => {
    const mockOnAuthStateChanged = firebaseAuth.onAuthStateChanged as jest.Mock;

    // Simulate a logged-in user
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ uid: "test-user-id" });
      return jest.fn();
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Nav />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("My Account")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });
});
