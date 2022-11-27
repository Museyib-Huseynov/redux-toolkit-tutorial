const redux = require('redux')
const produce = require('immer').produce
const createLogger = require('redux-logger').createLogger

const CAKE_ORDERED = 'CAKE ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

const orderCake = (qty = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  }
}

const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  }
}

const orderIcecream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  }
}

const restockIcecream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  }
}

const initialCakeState = {
  numOfCakes: 10,
}

const initialIcecreamState = {
  numOfIcecreams: 10,
}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return produce(state, (draft) => {
        draft.numOfCakes = draft.numOfCakes - action.payload
      })
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      }
    default:
      return state
  }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - action.payload,
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      }
    default:
      return state
  }
}

const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
})
const store = redux.createStore(
  rootReducer,
  redux.applyMiddleware(createLogger())
)
const unscubscribe = store.subscribe(() => console.log(store.getState()))
const actions = redux.bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(2)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

unscubscribe()
