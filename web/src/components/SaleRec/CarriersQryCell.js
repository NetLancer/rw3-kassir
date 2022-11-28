import { useEffect } from 'react' 
import { SelectField } from '@redwoodjs/forms' 

export const QUERY = gql`
  query airCarriersQuery($activeOnly: Boolean) {
    airCarriers(activeOnly: $activeOnly) {
      id
      codeName 
      active 
      consolidators {
        id
      }
    }
  }
` 

export const Loading = () => <p>Loading...</p>

export const Empty = () => <p>AirCarriers not found </p>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
) 

/////////////////////////
///////////////////
export const Success = ({ airCarriers, consId, activeOnly, ifCarrierId }) => {
  
  consId && (consId = parseInt(consId))
  //
  function FilteredCarriers() { 
    const filteredCarriers = consId ? airCarriers.filter(ac => (ac.consolidators.some(c => c.id === consId))) : airCarriers 
    //
    return (
      <SelectField 
        name="carrierId"  
        className="rw-input" 
        defaultValue={ifCarrierId ?? null}
        validation={{ valueAsNumber: true, required: true }}
      > 
        { filteredCarriers.map(a => (
          <option key={a.id} value={a.id} className={(a.active === false) ? 'inactive' : null}>{`${a.codeName} [${a.id}]`}</option>
          
        ))}
      </SelectField>
    )
  }
  
  useEffect(() => {
    // console.log('Carriers filteredBy: ', consId) 
    FilteredCarriers(consId) 

  }, [consId]) 
  
  return <FilteredCarriers />
} 

