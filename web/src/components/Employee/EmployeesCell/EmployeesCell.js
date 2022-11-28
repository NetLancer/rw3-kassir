import { Link, routes } from '@redwoodjs/router'

import Employees from 'src/components/Employee/Employees'

export const QUERY = gql`
  query FindEmployees($activeOnly: Boolean, $officeId: Int) {
    employees(activeOnly: $activeOnly, officeId: $officeId) {
      id
      fName
      mi
      lName
      cName
      dob
      active
      phoneNumber
      isManager
      bio
      worksSince
      officeId
    }
  }
`
export const beforeQuery = (props) => ({ variables: {activeOnly: props.activeOnly, officeId: props.officeId}}) 

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No employees yet. '}
      <Link to={routes.newEmployee()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

/////////////////////////////////////////
//////////////////////
export const Success = ({ employees }) => {
  // 
  let i = 0
  employees.forEach(e => { if (!e.active) i += 1 })
  //
  return ( 
    <>
      <Employees employees={employees} /> 
      <div className="text-center mt-6 text-slate-400"> 
        <p>Total <i>(shown)</i>: {employees.length}</p>
        {(i > 0) && (
          <p>Inactive: {i}</p>
        )} 
      </div>
    </>
  )
}
