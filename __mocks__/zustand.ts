import actualCreate from 'zustand'
// const actualCreate = jest.requireActual('zustand') // if using jest
import { act } from 'react-dom/test-utils'

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set()

// when creating a store, we get its initial state, create a reset function and add it in the set
const create = (createState: any) => {
  const store = actualCreate(createState)
  const initialState = store.getState()
  storeResetFns.add(() => store.setState(initialState, true))
  return store
}

beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn: any) => resetFn()))
})
export default create