export const ERROR = 'error';

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
}

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  try {
    const res = await api.get('/currentuser');

    return dispatch({
      type: FETCH_CURRENT_USER,
      payload: res
    });
  } catch (e) {
    return dispatch({
      type: FETCH_CURRENT_USER,
      payload: { data: false },
    });
  }
};

export const signin = ({ username, password }) => async (dispatch, getState, api) => {
  try {
    const res = await api.post('/signin', { username, password });

    dispatch({
      type: FETCH_CURRENT_USER,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: 'Error signing in'
    });
  }
};

export const signup = (user) => async (dispatch, getState, api) => {
  try {
    const res = await api.post('/signup', user);

    dispatch({
      type: FETCH_CURRENT_USER,
      payload: res
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: 'Error signing up'
    });
  }

};

export const signout = () => async (dispatch, getState, api) => {
  const res = await api.get('/signout');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
}

export const FETCH_ENTRIES = 'fetch_entries';
export const fetchEntries = () => async (dispatch, getState, api) => {
  const res = await api.get('/entries');

  dispatch({
    type: FETCH_ENTRIES,
    payload: res
  });
}

export const CREATE_ENTRY = 'create_entry';
export const createEntry = (entry) => async (dispatch, getState, api) => {
  try {
    const res = await api.post('/entries', entry);

    dispatch(fetchEntries());
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: 'Error saving entry'
    });
  }
};
