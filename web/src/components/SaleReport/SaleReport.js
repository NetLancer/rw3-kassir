import { Link, routes } from '@redwoodjs/router'

const SaleFiltered = ({ saleReport }) => { 
  // 
  return (
    <div className="rw-segment rw-table-wrapper-responsive"> 

          <table className="rw-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Office code</th>
              <th>Employee</th>
              <th>Cons Id</th>
              <th>Carrier code</th>
              <th>Ticket no</th>
              <th>From</th>
              <th>To</th>
              <th>Fare</th>
              <th>Tax1</th>
              <th>Tax2</th>
              <th>Tax3</th> 
              <th>Total</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {saleReport.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.date}</td>
                <td>{rec.officeId}</td>
                <td>{rec.employeeId}</td>
                <td>{rec.consId}</td>
                <td>{rec.carrierId}</td>
                <td>{rec.ticketNo}</td>
                <td>{rec.from}</td>
                <td>{rec.to}</td>
                <td>{rec.fare}</td>
                <td>{rec.tax1}</td>
                <td>{rec.tax2}</td>
                <td>{rec.tax3}</td>
                <td>{rec.total}</td>
                <td>
                  <nav className="rw-table-actions">
                    <Link
                      to={routes.saleRec({ id: rec.id })}
                      title={'Show saleRec ' + rec.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
    </div>
  )
}


export default SaleFiltered
