import { csrfFetch } from "./csrf";

const LOAD_USERS = 'users/LOAD';

const loadUsers = list => ({
  type: LOAD_USERS,
  list,
});

export const getUsers = () => async dispatch => {
  const response = await fetch(`/api/users`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadUsers(list));
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USERS:
      const allUsers = {};
      action.list.forEach(user => {
        allUsers[user.id] = user;
      });

      return allUsers;
    default:
      return state;
  }
};

export default usersReducer;
