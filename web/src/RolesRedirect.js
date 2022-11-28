import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'

const RolesRedirect = ({ allowedRole, children }) => {
  const { loading, hasRole } = useAuth()

  // console.log('Allowed-Role: ', allowedRole) 
  const zRole = allowedRole ?? 'admin' 

  if (loading) {
    return null
  }

  if (!hasRole(zRole)) {
    return <Redirect to={routes.saleRecs()} />
  }

  return children
}

export default RolesRedirect