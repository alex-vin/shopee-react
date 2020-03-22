import React, { Context, createContext, useContext, useReducer } from 'react'

const ProviderContext: Context<any> = createContext(null)

const provider = (reducer: Function, initState: any) => (
  WrapComponent: React.FC<any> | React.ComponentClass
) => {
  const wrapCmp = (props: any) => {
    const [state, dispatch] = useReducer<any>(reducer, initState)
    return (
      <ProviderContext.Provider value={{ state, dispatch }}>
        <WrapComponent {...props} />
      </ProviderContext.Provider>
    )
  }
  return wrapCmp
}

export default provider

export function useCommonRedux<T>() {
  interface Type {
    dispatch: any
    state: T
  }
  return useContext<Type>(ProviderContext)
}

export function combineReducers(reducers: any) {
  return function(state = {}, action: any) {
    return Object.keys(reducers).reduce((newState: any, key: string) => {
      newState[key] = reducers[key]((state as any)[key], action)
      return newState
    }, {})
  }
}
