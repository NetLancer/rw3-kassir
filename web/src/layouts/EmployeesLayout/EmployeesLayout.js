import { useAuth } from '@redwoodjs/auth' 
import { Link, Redirect, routes } from '@redwoodjs/router' 

const EmployeesLayout = ({ allowedRole, children }) => { 
  //
  const { logIn, logOut, isAuthenticated, hasRole, currentUser } = useAuth() 
  const zRole = allowedRole ?? 'admin' 
  
  // Remember, secure by default ....
  if (!hasRole(zRole)) {
    return <Redirect to={routes.home()} />
  } 

  //
  return (
    <> 
      <header className="rw-header">
        {isAuthenticated ? (
            <div className="flex"> 
              {' '}
              {currentUser && (
                <>
                  <small><b className="text-slate-500">LoggedIn: </b> {currentUser.roles}</small> 
                </>
                )
              } 
              {' '}
              <button type="button" onClick={logOut} className="rw-button ml-6 leading-8 px-4 bg-zinc-500 border rounded-lg text-lg max-h-12 text-neutral-300">
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()} className="py-2 px-4 text-slate-500 font-semibold">
              Login
            </Link>
        )}
        
        <h1 className="text-center text-slate-600 text-2xl font-bold tracking-wide my-4">Employees List</h1> 
        
        {(hasRole('admin')) && (
          <Link to={routes.newEmployee()} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> New Employee
          </Link>
        )}
      </header>
      <main className="rw-main">{children}</main>
    </>
  )
}

export default EmployeesLayout
