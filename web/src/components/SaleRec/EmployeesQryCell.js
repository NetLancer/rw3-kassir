import { SelectField } from '@redwoodjs/forms' 

export const QUERY = gql`
  query employeesQuery($activeOnly: Boolean) {
    employees(activeOnly: $activeOnly) {
      id
      cName 
      active 
      officeAttached {
        id
      }
    }
  }
` 

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <p>Loading...</p>

export const Empty = () => <p>Employees not found </p>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
) 


//////////////////////////
/////////////
export const Success = ({ employees, ifEmployeeId, activeOnly, officeId }) => { 

  // ifEmployeeId && console.log('Default EmployeeId: ', ifEmployeeId, typeof(ifEmployeeId)) 
  //
  const FilteredEmployees = ({ officeId }) => { 

    const filtered = employees.filter(e => (e.officeAttached?.id === officeId)) 
  //  console.log('filteredByOffice: ', officeId, typeof(officeId)) 
    
    return (
      <SelectField 
        name="employeeId"  
        className="rw-input" 
        defaultValue={ifEmployeeId}
        validation={{ valueAsNumber: true, required: true }}
      > 
        { filtered.map(e => (
          <option key={e.id} value={e.id} className={(e.active === false) ? 'inactive' : null}>{`${e.cName} [${e.id}]`}</option>
          
        ))}
      </SelectField>
    ) 
  }  
  

  return <FilteredEmployees officeId={parseInt(officeId)} /> 
}



//  useEffect(() => {
//    console.log('Filtered By: ', officeId) 
//    
//    FilteredEmployees(officeId) 
//
//  }, [officeId]) 


