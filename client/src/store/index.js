import { createStore, compose } from 'redux'
import reducers from '../reducers'
import { saveState } from './localstorage'

const defaultState = (localStorage.getItem('state') && JSON.parse(localStorage.getItem('state'))) || {}

export default function configureStore(initialState = defaultState) {
  const enhancer = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
  const store = createStore(reducers, initialState, enhancer)

  store.subscribe(() => {
    saveState({
      currentUser: store.getState().currentUser,
    })
  })

  return { store }
}
