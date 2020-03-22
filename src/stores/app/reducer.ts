import { APP_AUTHED } from './type'

interface AppInitState {
  authed: boolean
}

export const appIniState: AppInitState = {
  authed: false,
}

export function appReducer(state = appIniState, action: any) {
  console.log(state, action)
  switch (action.type) {
    case APP_AUTHED:
      return { ...state, authed: action.data }
    default:
      return state
  }
}
