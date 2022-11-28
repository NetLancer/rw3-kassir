import { Link, routes } from '@redwoodjs/router'

import SaleRecs from 'src/components/SaleRec/SaleRecs' 
import Pagination from 'src/components/Pagination'
// import {RECS_PER_PAGE} from 'src/pages/SaleRec_/SaleRecsPage'

export const QUERY = gql`
  query SaleRecsQuery($pgNum: Int, $recsPerPage: Int!) {
    saleRecs: saleRecs(pgNum: $pgNum, recsPerPage: $recsPerPage) { 
      recs {
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
      count
    }
  }
`


export const Loading = () => <div>Loading...</div> 

export const beforeQuery = ({ pgNum, recsPerPage }) => {
  pgNum = pgNum ? parseInt(pgNum, 10) : 1

  return { variables: { pgNum, recsPerPage } }
}

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No saleRecs yet. '}
      <Link to={routes.newSaleRec()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

//////////////////////////////////////////////////
///////////////////////
export const Success = ({ saleRecs, pgNum, recsPerPage }) => { 
  //
  return ( 
    <>
      <SaleRecs saleRecs={saleRecs.recs} pgNum={pgNum} recsPerPage={recsPerPage} /> 
      <br />
      <hr /> 
      
      {(saleRecs.count > recsPerPage) && (
        <Pagination recsCount={saleRecs.count} pageNumber={pgNum} recsPerPage={recsPerPage} pageRecsNum={saleRecs.recs.length} /> 
      )}
    </>
  )
}
