import React from "react";
import { render, screen } from "@testing-library/react";
import SignUp from "~/routes/signUp";
import { MemoryRouter } from "react-router";
import * as firebaseAuth from "firebase/auth";
import userEvent from "@testing-library/user-event";

// Mock firebase/auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => {}),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
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

describe("Sign Up Component", () => {
  test("renders without error", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    const fullNameInput = screen.getByLabelText("Full Name");
    expect(fullNameInput).toBeInTheDocument();
    expect(fullNameInput).toHaveValue("");

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");

    const title = screen.getByText(/join us to keep posted/i);
    expect(title).toBeInTheDocument();
  });

  test("button is enabled when fields are filled", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Full Name"), "John Doe");
    await userEvent.type(screen.getByLabelText("Email"), "john@example.com");
    await userEvent.type(
      screen.getByLabelText("Password"),
      "securePassword123"
    );

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });

  test("error: email already in use", async () => {
    const mockCreateUser =
      firebaseAuth.createUserWithEmailAndPassword as jest.Mock;

    mockCreateUser.mockRejectedValueOnce({
      code: "auth/email-already-in-use",
      message: "Email already in use",
    });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "strongpassword");

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(
      await screen.findByText(/already belongs to an active account/i)
    ).toBeInTheDocument();
  });

  test("error: password is weak", async () => {
    const mockCreateUser =
      firebaseAuth.createUserWithEmailAndPassword as jest.Mock;

    mockCreateUser.mockRejectedValueOnce({
      code: "auth/weak-password",
      message: "Password is weak",
    });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "12");

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(
      await screen.findByText(/password should be a minimum of 6 characters/i)
    ).toBeInTheDocument();
  });

  test("routes to accounts page if successful", async () => {
    const mockCreateUser =
      firebaseAuth.createUserWithEmailAndPassword as jest.Mock;
    const mockUpdateProfile = firebaseAuth.updateProfile as jest.Mock;

    const mockUser = { uid: "abc123" };

    mockCreateUser.mockResolvedValueOnce({ user: mockUser });
    mockUpdateProfile.mockResolvedValueOnce("Jane Doe");

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "securepass");

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/user/abc123");
  });
});
