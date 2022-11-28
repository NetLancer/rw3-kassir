import { Link, routes, navigate } from '@redwoodjs/router' 
import { useAuth } from '@redwoodjs/auth' 
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployeeMutation($id: Int!) {
    deleteEmployee(id: $id) {
      id
    }
  }
` 

const DEACTIVATE_EMPLOYEE_MUTATION = gql`
  mutation DeactivateEmployeeMutation($id: Int!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
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

//////////////////////////////////////
///////////////////////////////
const Employee = ({ employee, salesCount }) => { 
  //
  const { isAuthenticated, hasRole } = useAuth()
  //

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE_MUTATION, {
    onCompleted: () => {
      toast.success('Employee deleted')
      navigate(routes.employees())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  }) 
  
  const [deactivateEmployee, { loading, error }] = useMutation(
    DEACTIVATE_EMPLOYEE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Cool, Deactivated!')
        navigate(routes.employees())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const deleteAgent = (id) => { 
    if (confirm('Are you sure you want to delete employee ' + id + ' ?')) {
      deleteEmployee({ variables: { id } })
    }
  } 
  
  // filter out the original employee (object) & set active to false
  function plainCopy(source) {
   const copy = {}
   Object.entries(source).filter(([key, value]) => {
     if (key.slice(0,2) !== '__' && key !== 'id') copy[key] = value
   })
    copy.active = false
    return copy
  } 
  
  const deactivateAgent = (id) => {
    if (confirm('Sure to DEactivate employee ' + id + ' ?')) { 
      const employeeCopy = plainCopy(employee)
       
      // console.log('Modified Copy: ', employeeCopy)
      deactivateEmployee({ variables: { id, input: employeeCopy } })
    }
  } 
  
  //
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header"> 
          <h1 className="text-center font-semibold text-slate-500"> Employee [Id: {employee?.id}] detail</h1> 
          {(employee?.active === false) && <h3 className="text-center font-semibold text-rose-600">DEACTIVATED (!!)</h3>}
        </header> 
        
        <div 
          style={{ maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto', border: '1px dotted LightGray', borderRadius: '0.75rem', overflow: 'hidden' }} 
          className="mt-6 mb-4"
        >
          <table className="rw-table">
            <tbody>
              <tr>
                <th>Id</th>
                <td>{employee?.id}</td>
              </tr>
              <tr>
                <th>First name</th>
                <td>{employee?.fName}</td>
              </tr>
              <tr>
                <th>Mi</th>
                <td>{employee?.mi}</td>
              </tr>
              <tr>
                <th>Last name</th>
                <td>{employee?.lName}</td>
              </tr>
              <tr>
                <th>Code name</th>
                <td>{employee?.cName}</td>
              </tr>
              <tr>
                <th>DOB</th>
                <td>{timeTag(employee?.dob)}</td>
              </tr>
              <tr>
                <th>Active</th>
                <td>{checkboxInputTag(employee?.active)}</td>
              </tr>
              <tr>
                <th>Phone number</th>
                <td>{employee?.phoneNumber}</td>
              </tr>
              <tr>
                <th>Is manager</th>
                <td>{checkboxInputTag(employee?.isManager)}</td>
              </tr>
              <tr>
                <th>Bio</th>
                <td>{employee?.bio}</td>
              </tr>
              <tr>
                <th>Works since</th>
                <td>{timeTag(employee?.worksSince)}</td>
              </tr>
              <tr>
                <th>OfficeId</th>
                <td>{employee?.officeId}</td>
              </tr> 
              <tr className="text-slate-400">
                <th>Sales.count</th>
                <td>{salesCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> 
      {hasRole('admin') && (
        <nav className="rw-button-group">
          <Link
            to={routes.editEmployee({ id: employee.id })}
            className="rw-button rw-button-blue"
          >
            Edit 
          </Link> 
          
          {(salesCount > 0) ? (
            <button
            type="button" 
            id="deactivate" 
            className="rw-button rw-button-red" 
            disabled={!employee.active}
            onClick={() => deactivateAgent(employee.id)}
          >
            SetInactive
          </button>
          ) : (
            <button
            type="button" 
            id="delete" 
            className="rw-button rw-button-red"
            onClick={() => deleteAgent(employee.id)}
          >
            Delete
          </button>
          )}
          
        </nav> 
      )}
    </>
  )
}

export default Employee
