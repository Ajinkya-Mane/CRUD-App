import { addUser, deleteUser, updateUsername, userSlice } from "./Users";


it("addUser should add a new user to the state", () => {
  const initialState = { value: [] };
  const user = { id: 1, name: "John Doe", email: "john@example.com" };
  const action = addUser(user);

  const newState = userSlice.reducer(initialState, action);

  expect(newState.value).toHaveLength(1);
  expect(newState.value[0]).toEqual(user);
});

it("deleteUser should remove the user from the state", () => {
    const initialState = { value: [{ id: 1, name: "John Doe", email: "john@example.com" }] };
    const userId = 1;
    const action = deleteUser({ id: userId });
  
    const newState = userSlice.reducer(initialState, action);
  
    expect(newState.value).toHaveLength(0);
  });

  it("updateUsername should update the username and email of the user", () => {
    const initialState = {
      value: [{ id: 1, name: "John Doe", email: "john@example.com" }],
    };
    const updatedUser = { id: 1, name: "Jane Smith", email: "jane@example.com" };
    const action = updateUsername(updatedUser);
  
    const newState = userSlice.reducer(initialState, action);
  
    expect(newState.value[0].name).toBe(updatedUser.name);
    expect(newState.value[0].email).toBe(updatedUser.email);
  });
