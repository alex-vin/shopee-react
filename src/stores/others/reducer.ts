import { OTHER_COUNT } from './type'

export const otherState = {
  count: 100,
}

export function otherReducer(state = otherState, action: any) {
  switch (action.type) {
    case OTHER_COUNT:
      return { ...state, authed: state.count++ }
    default:
      return state
  }
}
