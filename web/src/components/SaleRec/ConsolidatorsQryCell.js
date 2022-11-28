import { SelectField } from '@redwoodjs/forms' 

export const QUERY = gql`
  query consolidatorsQuery($activeOnly: Boolean) {
    consolidators: consolidators(activeOnly: $activeOnly) {
      id
      cName 
      active
    }
  }
` 

export const Loading = () => <p>Loading...</p>

export const Empty = () => <p>Consolidators not found </p>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)
///////////////////
export const Success = ({ consolidators, onConsSelect, activeOnly, ifConsId }) => { 
 
  // ifConsId && console.log('Default ConsId: ', ifConsId, typeof(ifConsId)) // for debug ..
  //
  return (
    <SelectField 
      name="consId" 
      defaultValue={ifConsId}
      onChange={onConsSelect}
      className="rw-input" 
      validation={{ valueAsNumber: true, required: true }}
    > 
      {
        consolidators.map((cons) => {
          return <option key={cons.id} value={cons.id} className={(cons.active === false) ? 'inactive' : null}>{`${cons.cName} [${cons.id}]`}</option> 
          
        })
      }
    </SelectField>
    
  ) 
}


