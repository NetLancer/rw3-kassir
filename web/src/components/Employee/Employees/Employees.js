import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Employee/EmployeesCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployeeMutation($id: Int!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`

const EmployeesList = ({ employees }) => {
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE_MUTATION, {
    onCompleted: () => {
      toast.success('Employee deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete employee ' + id + '?')) {
      deleteEmployee({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Mi</th>
            <th>Last name</th>
            <th>Code name</th>
            <th>DOB</th>
            <th>Active</th>
            <th>Phone number</th>
            <th>Is manager</th>
            <th>Bio</th>
            <th>Works since</th>
            <th>OfficeId</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{truncate(employee.id)}</td>
              <td>{truncate(employee.fName)}</td>
              <td>{truncate(employee.mi)}</td>
              <td>{truncate(employee.lName)}</td>
              <td>{truncate(employee.cName)}</td>
              <td>{timeTag(employee.dob)}</td>
              <td>{checkboxInputTag(employee.active)}</td>
              <td>{truncate(employee.phoneNumber)}</td>
              <td>{checkboxInputTag(employee.isManager)}</td>
              <td>{truncate(employee.bio)}</td>
              <td>{timeTag(employee.worksSince)}</td>
              <td>{truncate(employee.officeId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.employee({ id: employee.id })}
                    title={'Show employee ' + employee.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEmployee({ id: employee.id })}
                    title={'Edit employee ' + employee.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete employee ' + employee.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(employee.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      
    </div>
  )
}

export default EmployeesList
