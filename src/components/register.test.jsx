import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import { act } from "react-dom/test-utils";



test("enables button when all fields are are entered", () => {
  render(<Register />);
  expect(getButton()).toBeDisabled();
  act(() => {
    userEvent.type(getName(), "Prasil Parmar");
    userEvent.type(getEmail(), "prashil117@gmail.com");
    userEvent.type(getPassword(), "Test1234");
  });
  expect(getButton()).toBeEnabled();
})

test("Name Validation accept only alphabetics", async () => {
  render(<Register />);
  act(() => {
    userEvent.type(getName(), 'Carlos');
  })
  await waitFor(() => {
    expect(getName().value).toMatch(new RegExp(/^[a-zA-Z]+$/))
  });
})


test("check email Validation", async () => {
  render(<Register />);
  act(() => {
    userEvent.type(getEmail(), 'abc@gmail.com');
  })
  await waitFor(() => {
    expect(getEmail().value).toMatch(new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/))
  });
})


test("check password Validation", async () => {
  render(<Register />);
  act(() => {
    userEvent.type(getPassword(), 'Random@1234');
  })
  await waitFor(() => {
    expect(getPassword().value).toMatch(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[0-9]).{8,}$/))
  });
})


test("cant submit form when button is disabled", async () => {
  const onSubmit = jest.fn();
  render(<Register onSubmit={onSubmit} />);
  clickSubmitButton();
  expect(onSubmit).toHaveBeenCalledTimes(0)
})


test("enables button when all fields are are entered", async () => {
  const onSubmit = jest.fn();
  render(<Register onSubmit={onSubmit} />);
  act(() => {
    userEvent.type(getName(), "Prasil Parmar");
    userEvent.type(getEmail(), "prashil117@gmail.com");
    userEvent.type(getPassword(), "Test1234");
  });
  clickSubmitButton();
  expect(onSubmit).toHaveBeenCalledTimes(1)
})




function getName() {
  const name = screen.getByRole("textbox", { name: /name/i });
  expect(name).toHaveAttribute("type", "text");
  return name;
}


function getEmail() {
  const email = screen.getByRole("textbox", { name: /email/i })
  expect(email).toHaveAttribute("type", "email");
  return email;
}

function getPassword() {
  const password = screen.getByLabelText(/password/i);
  expect(password).toHaveAttribute("type", "password");
  return password;
}

function getButton() {
  return screen.getByRole("button", { name: /Register/i })
}

function clickSubmitButton() {
  userEvent.click(getButton());
}

