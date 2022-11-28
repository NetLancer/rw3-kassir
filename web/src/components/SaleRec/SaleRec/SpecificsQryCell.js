
export const QUERY = gql`
  query FindSpecifics($officeId: Int!, $employeeId: Int!, $consId: Int!, $carrierId: Int!) {
    office: office(id: $officeId) {
      id 
      cName
    } 
    agent: employee(id: $employeeId) { 
      id 
      cName
    } 
    consolidator: consolidator(id: $consId) {
      id 
      cName
    } 
    carrier: airCarrier(id: $carrierId) { 
    	id 
      codeName
    }
  }
` 

export const Loading = () => <div>Loading Specifics...</div>

export const Empty = () => <div>Specifics not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ office, agent, consolidator, carrier }) => { 

  
  return ( 
    <ul> 
      <li>{office.cName}</li> 
      <li>{agent.cName}</li>
      <li>{consolidator.cName}</li>
      <li>{carrier.codeName}</li>
    </ul>
  )
}