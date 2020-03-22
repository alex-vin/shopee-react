import { APP_AUTHED } from './type'

export default {
  updateAuth(data: boolean) {
    return {
      type: APP_AUTHED,
      data,
    }
  },
}
