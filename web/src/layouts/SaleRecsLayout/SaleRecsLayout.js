import { Link, Redirect, routes } from '@redwoodjs/router' 
import { useAuth } from '@redwoodjs/auth' 
import { Toaster } from '@redwoodjs/web/toast'


const SaleRecsLayout = ({ allowedRole, children }) => {
  //
  const { logIn, logOut, isAuthenticated, hasRole, currentUser } = useAuth() 

  if (allowedRole && !hasRole(allowedRole)) {
    return <Redirect to={routes.home()} />
  } 
  //
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 4000 }} />
      <header className="rw-header">
        {isAuthenticated ? (
            <div className="flex"> 
              {' '}
              {currentUser && (
                <>
                  <small><b className="text-slate-500">LoggedIn: </b> {currentUser.email}</small> 
                </>
                )
              } 
              {' '}
              <button type="button" onClick={logOut} className="ml-4 py-0 px-4 border rounded-lg text-slate-700">
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()} className="py-2 px-4 text-slate-500 font-semibold">
              Login
            </Link>
        )}
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.saleRecs()} className="rw-link">
            Sale Records
          </Link>
        </h1> 
        {isAuthenticated ? (
          <Link to={routes.newSaleRec()} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> New SaleRec
          </Link>
        ) : (
          <small className="text-slate-400"><i>Please LogIn for adding new recs :)</i></small>
        )}
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default SaleRecsLayout
