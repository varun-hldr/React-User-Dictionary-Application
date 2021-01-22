export default function usersReducer(state = { isLoaded: false }, action) {
  switch (action.type) {
    case "USERS":
      return { ...state, users: action.payload, isLoaded: true };
    case "LOADED":
      return { isLoaded: action.payload };
    default:
      return state;
  }
}
