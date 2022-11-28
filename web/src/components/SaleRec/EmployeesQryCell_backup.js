import { SelectField } from '@redwoodjs/forms' 
import { useEffect, useState } from 'react' 



export const QUERY = gql`
  query employeesByOfficeQuery($officeId: Int!) {
    employeesByOffice(officeId: $officeId) {
      id
      cName 
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
export const Success = ({ employeesByOffice, officeId }) => { 
  //
  const filtered = officeId ? employeesByOffice.filter((e) => e.officeAttached.id === officeId) : employees 
  
  useEffect(() => {
    console.log('Filtered By: ', officeId) 
    refetchQueries: [{ query: QUERY, variables: { officeId } }] 

  }, [officeId]) 
  

  return (
    <SelectField 
      name="employeeName" 
      className="rw-input"
    > 
        { filtered.map(e => (
          <option key={e.id}>{e.cName}</option>
          
        )) }
    </SelectField>
  ) 
}






