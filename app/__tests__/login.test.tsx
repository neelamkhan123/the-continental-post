import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "~/routes/login";
import { MemoryRouter } from "react-router";
import * as firebaseAuth from "firebase/auth";
import userEvent from "@testing-library/user-event";

// Mock firebase/auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => {}),
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock react-router's useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router", () => {
  const originalModule = jest.requireActual("react-router");
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Component", () => {
  test("renders without error", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");

    const title = screen.getByText(/welcome back/i);
    expect(title).toBeInTheDocument();
  });

  test("button is enabled when fields are filled", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Email"), "john@example.com");
    await userEvent.type(
      screen.getByLabelText("Password"),
      "securePassword123"
    );

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });

  test("error: crediential do not match", async () => {
    const mockCreateUser = firebaseAuth.signInWithEmailAndPassword as jest.Mock;

    mockCreateUser.mockRejectedValueOnce({
      code: "auth/invalid-credential",
      message: "Crediential do not match",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "strongpassword");

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(
      await screen.findByText(
        /we couldn’t find an account with those credentials/i
      )
    ).toBeInTheDocument();
  });

  test("routes to accounts page if successful", async () => {
    const mockCreateUser = firebaseAuth.signInWithEmailAndPassword as jest.Mock;
    const mockUpdateProfile = firebaseAuth.updateProfile as jest.Mock;

    const mockUser = { uid: "abc123" };

    mockCreateUser.mockResolvedValueOnce({ user: mockUser });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "securepass");

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/user/abc123");
  });
});
