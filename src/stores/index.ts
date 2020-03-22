import { combineReducers } from './common'

import { appIniState, appReducer } from './app/reducer'
import { otherState, otherReducer } from './others/reducer'

export const reducer = combineReducers({
  appStore: appReducer,
  otherStore: otherReducer,
})

export const initState = {
  appStore: appIniState,
  otherStore: otherState,
}
