// import { getCurrentUser } from 'src/lib/auth' 
import { useAuth } from '@redwoodjs/auth' 
import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast' 

import { QUERY as SpecsQuery } from 'src/components/SaleRec/SaleRec/SpecificsQryCell'
import { useQuery } from '@redwoodjs/web'

const DELETE_SALE_REC_MUTATION = gql`
  mutation DeleteSaleRecMutation($id: Int!) {
    deleteSaleRec(id: $id) {
      id
    }
  }
`

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => { 
  const formattedDT = datetime ? new Date(datetime).toUTCString() : 'unknown'
  return (
    datetime && ( 
      <div>
        <time dateTime={datetime} title={datetime}>
          {formattedDT.slice(0,16)}
        </time> 
        {' '}
        <small className="text-gray-400"> [
          <time dateTime={datetime} title={datetime}>
            {formattedDT.slice(17)}
          </time>
        ] 
        </small>
      </div>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Tiny = ({ children }) => <small style={{color: "gray"}}> [<i>{children}</i>]</small>


///////////////////////////////////////////// 
////////////////////////
const SaleRec = ({ saleRec }) => { 

  const { isAuthenticated, currentUser, hasRole } = useAuth() 
  const { officeId, employeeId, consId, carrierId } = saleRec 
  
  // // // // // // //
  const { loading, error, data } = useQuery(SpecsQuery, {
    variables: { officeId, employeeId, consId, carrierId }
  })
  
  
  const [deleteSaleRec] = useMutation(DELETE_SALE_REC_MUTATION, {
    onCompleted: () => {
      toast.success('SaleRec deleted')
      navigate(routes.saleRecs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Sure you want to delete record: ' + id + '?')) {
      deleteSaleRec({ variables: { id } })
    }
  }
  //
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header pl-8">
          <h2 className="rw-heading rw-heading-secondary">
            SaleRec ID: {saleRec.id} detail
          </h2>
        </header> 

        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{saleRec.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(saleRec.date)}</td>
            </tr>
            <tr>
              <th>Office code</th>
              <td>{saleRec.officeId} <Tiny>{loading && 'Loading..'}{data?.office.cName}</Tiny></td>
            </tr>
            <tr>
              <th>Employee code</th>
              <td>{saleRec.employeeId} <Tiny>{loading && 'Loading..'}{data?.agent.cName}</Tiny></td>
            </tr>
            <tr>
              <th>Consolidator code</th>
              <td>{saleRec.consId} <Tiny>{loading && 'Loading..'}{data?.consolidator.cName}</Tiny></td>
            </tr>
            <tr>
              <th>Carrier code</th>
              <td>{saleRec.carrierId} <Tiny>{loading && 'Loading..'}{data?.carrier.codeName}</Tiny></td>
            </tr>
            <tr>
              <th>Ticket no</th>
              <td>{saleRec.ticketNo}</td>
            </tr>
            <tr>
              <th>From</th>
              <td>{saleRec.from}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{saleRec.to}</td>
            </tr>
            <tr>
              <th>Fare</th>
              <td>{saleRec.fare}</td>
            </tr>
            <tr>
              <th>Tax1</th>
              <td>{saleRec.tax1}</td>
            </tr>
            <tr>
              <th>Tax2</th>
              <td>{saleRec.tax2}</td>
            </tr>
            <tr>
              <th>Tax3</th>
              <td>{saleRec.tax3}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {hasRole('admin') && (
        <nav className="rw-button-group">
          <Link
            to={routes.editSaleRec({ id: saleRec.id })}
            className="rw-button rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(saleRec.id)}
          >
            Delete
          </button>
        </nav>
      )}
    </>
  )
}

export default SaleRec
