import SaleReport from 'src/components/SaleReport' 
// import Pagination from 'src/components/Pagination' 

const RECS_PER_PAGE = 4 


export const QUERY = gql`
  query SalesFilteredQuery($dateFrom: DateTime!, $dateTo: DateTime!, $officeId: Int, $dateOrder: String) {
    saleRecsFiltered(dateFrom: $dateFrom, dateTo: $dateTo, officeId: $officeId, dateOrder: $dateOrder) { 
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

export const beforeQuery = ({ dateFrom, dateTo, officeId, dateOrder }) => {

  return { variables: { dateFrom, dateTo, officeId, dateOrder } }
}


//export const beforeQuery = (props) => {
//  return {
//    variables: { ...props, office: 1 }
//  }
//}

//export const Empty = (props) => { 
//  return <div>Empty</div> 
//}


export const Failure = ({ error }) => { 
  // console.log(dateFrom)
  return <div style={{ color: 'red' }}>Error: {error?.message}</div>
} 

export const Loading = () => <div className="pl-4 font-xl text-cyan-600">Loading content...</div> 

function getSum(total, num) {
  return total + Math.round(num)
}

//////////////////////////////////////
////////////////////
export const Success = ({ saleRecsFiltered, recsfound }) => { 
  const recordsNum = saleRecsFiltered.length ? saleRecsFiltered.length : 0  
  
  const srCopy = [] 
  let fareArr = [], totalArr = [] 
  
  saleRecsFiltered.map(r => { 
    const summed = r.fare + r.tax1 + r.tax2 + r.tax3 
    const recCopy = {...r, total: summed} 
    
    srCopy.push(recCopy)
  }) 
  
  
  srCopy.map(r => { 
    if (r.fare) fareArr.push(r.fare) 
    if (r.total) totalArr.push(r.total)
  }) 
  
  //
  return (  
      <>
        {(recordsNum > 0) ? (
          <SaleReport saleReport={srCopy} recsfound={recsfound(recordsNum)} />
        ) : (
          <div recsfound={recsfound(recordsNum)}>&nbsp;</div>
        )}
         
         
        <table className="mt-8 ml-6 leading-6"> 
          <thead>
            <tr>
              <th colSpan={3} style={{"color": "SlateGray"}}>Recs found: {srCopy?.length}</th>
            </tr> 
          </thead> 
          <tbody>
            <tr>
              <td colSpan={3} style={{"borderTop": "1px dashed DimGray"}}></td>
            </tr>
            <tr className="italic">
              <td>Fare Sum: </td> 
              <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td> &#8356; {fareArr?.reduce(getSum, 0)}</td>
            </tr>
            <tr className="italic">
              <td>GrandTotal: </td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td> &#8356; {totalArr?.reduce(getSum, 0)}</td>
            </tr> 
          </tbody>
        </table> 
      </>

  )
}

//   pgNum = pgNum ? parseInt(pgNum, 10) : 1 
// <Pagination recsCount={saleRecsFiltered.count} recsPerPage={RECS_PER_PAGE} /> 