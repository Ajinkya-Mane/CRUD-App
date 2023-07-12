import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";
import { addUser, deleteUser, updateUsername } from "./Features/Users";

const mockStore = configureStore([]);

describe("App", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      users: {
        value: [
          { id: 1, name: "John", email: "john@example.com" },
          { id: 2, name: "Jane", email: "jane@example.com" },
        ],
      },
    });

    component = (
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("renders the app correctly", () => {
    render(component);
  
    // Check if the Add User button is rendered
    expect(screen.getByText("Add User")).toBeInTheDocument();
    

    // Check if the table headers are rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("User Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("adds a user when Add User button is clicked", () => {
    render(component);

    // Fill in the input fields
    fireEvent.change(screen.getByPlaceholderText("Enter Name..."), {
      target: { value: "New User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Email..."), {
      target: { value: "newuser@example.com" },
    });

    // Click the Add User button
    fireEvent.click(screen.getByText("Add User"));

    // Check if the addUser action was dispatched
    expect(store.getActions()).toContainEqual(
      addUser({ id: 3, name: "New User", email: "newuser@example.com" })
    );
  });

  it("deletes a user when Delete button is clicked", () => {
    render(component);

    // Click the Delete button for the first user
    fireEvent.click(screen.getAllByText("Delete")[0]);

    // Check if the deleteUser action was dispatched
    expect(store.getActions()).toContainEqual(deleteUser({ id: 1 }));
  });

  it("updates a user's name and email when Update button is clicked", () => {
    render(component);

    // Fill in the input fields
    fireEvent.change(screen.getAllByPlaceholderText("Enter New Name...")[0], {
      target: { value: "Updated Name" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Enter New Email...")[0], {
      target: { value: "updated@example.com" },
    });

    // Click the Update button for the first user
    fireEvent.click(screen.getAllByText("Update")[0]);

    // Check if the updateUsername action was dispatched
    expect(store.getActions()).toContainEqual(
      updateUsername({ id: 1, name: "Updated Name", email: "updated@example.com" })
    );
  });
});
