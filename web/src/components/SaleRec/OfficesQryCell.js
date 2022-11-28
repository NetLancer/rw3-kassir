import { SelectField } from '@redwoodjs/forms' 

export const QUERY = gql`
  query AllOfficesQuery($activeOnly: Boolean) {
    offices(activeOnly: $activeOnly) {
      id
      cName 
      active
    }
  }
` 

export const Loading = () => <p>Loading...</p>

export const Empty = () => <p>Offices not found </p>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)
///////////////////
export const Success = ({ offices, onOfficeSelect, filterControl = false, activeOnly, ifOfficeId }) => { 
  // 
  // ifOfficeId && console.log('Default OfficeId: ', ifOfficeId, typeof(ifOfficeId))
  //  
  return (
    <SelectField 
      name="officeId" 
      defaultValue={ifOfficeId}
      onChange={onOfficeSelect}
      className="rw-input" 
      validation={{ valueAsNumber: true, required: true }}
    > 
    
      {filterControl && (
        <option key={0} value={0}>ALL</option>  
      )}
      
      {
        offices.map((office) => { 
            const { id, cName, active } = office 
            return ( 
              <option 
                key={id} value={id} 
                className={!active ? 'inactive' : null}
              >
                {`${cName} [${id}]`}
              </option> 
            )
        })
        
      }
    </SelectField>
    
  ) 
}

