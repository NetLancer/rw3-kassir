import Employee from 'src/components/Employee/Employee'

export const QUERY = gql`
  query FindEmployeeById($id: Int!) {
    employee: employeeSC(id: $id) { 
      agent {
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
      salesCount
    }
  }
`

// export const beforeQuery = ({ id }) => { variables: { id: parseInt(id) } }

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Employee not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

/////////////////////////////////////
///////////////////
export const Success = ({ employee }) => {
  return ( 
    <> 
      <Employee employee={employee.agent} salesCount={employee.salesCount} /> 
    </>
  )
}
