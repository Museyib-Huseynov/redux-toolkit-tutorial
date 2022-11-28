const redux = require('redux')
const axios = require('axios')
const thunk = require('redux-thunk').default

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequested = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}

const fetchUsersSucceeded = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  }
}

const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  }
}

const initialState = {
  loading: false,
  users: [],
  error: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: '',
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      }
    default:
      return state
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequested())
    console.log(1)
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const users = response.data.map((i) => i.id)
        dispatch(fetchUsersSucceeded(users))
        console.log('done')
      })
      .catch((error) => {
        dispatch(fetchUsersFailed(error.message))
        console.log('error happened')
        console.log(error.message)
      })
    console.log('after')
  }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunk))
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(fetchUsers())
