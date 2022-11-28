import SaleRec from 'src/components/SaleRec/SaleRec'

export const QUERY = gql`
  query FindSaleRecById($id: Int!) {
    saleRec: saleRec(id: $id) {
      id
      date
      officeId
      employeeId
      consId
      carrierId
      ticketNo
      from
      to
      fare
      tax1
      tax2
      tax3
    }
  } 
`


export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>SaleRec not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ saleRec }) => { 
  
  return <SaleRec saleRec={saleRec} />
}

