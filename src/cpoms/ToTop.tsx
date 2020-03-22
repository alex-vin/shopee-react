import { useEffect } from 'react'
import { withRouter, useLocation } from 'react-router-dom'

const ToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default withRouter(ToTop)
