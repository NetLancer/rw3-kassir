import { useAuth } from '@redwoodjs/auth' 
import { navigate } from '@redwoodjs/router' 
import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/SaleRec/SaleRecsCell'

const DELETE_SALE_REC_MUTATION = gql`
  mutation DeleteSaleRecMutation($id: Int!) {
    deleteSaleRec(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 70

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

const truncate = (value) => {
  const output = value?.toString()
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output ?? ''
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => { 
  const formattedDT = datetime ? new Date(datetime).toISOString() : 'unknown'
  return (
    datetime && ( 
      <div>
        <time dateTime={datetime} title={datetime}>
          {formattedDT.slice(0,10)}
        </time> 
        {' '}
        <time dateTime={datetime} title={datetime} className="text-gray-400">
          {formattedDT.slice(12)}
        </time>
      </div>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

//////////////////////////////////////////////////
///////////////////////////////
const SaleRecsList = ({ saleRecs, pgNum, recsPerPage }) => { 
  // pgNum & recsPerPage params -- for refetch upon deletion 

  const { hasRole } = useAuth() 
  const prevPg = pgNum > 1 ? (pgNum - 1) : 1

  const [deleteSaleRec] = useMutation(DELETE_SALE_REC_MUTATION, {
    onCompleted: () => {
      toast.success('SaleRec deleted') 
      setTimeout(navigate(routes.saleRecs({ pgNum: prevPg })), 250)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to update cache:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY, variables: { recsPerPage } }],
    awaitRefetchQueries: true,
  })


  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete saleRec ' + id + '?')) {
      deleteSaleRec({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Date</th>
            <th>OfficeID</th>
            <th>AgentID</th>
            <th>ConsID</th>
            <th>CarrierID</th>
            <th>Ticket no</th>
            <th>From</th>
            <th>To</th>
            <th>Fare</th>
            <th>Tax1</th>
            <th>Tax2</th>
            <th>Tax3</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {saleRecs.map((saleRec) => (
            <tr key={saleRec.id}>
              <td>{truncate(saleRec.id)}</td>
              <td>{timeTag(saleRec.date)}</td>
              <td>{truncate(saleRec.officeId)}</td>
              <td>{truncate(saleRec.employeeId)}</td>
              <td>{truncate(saleRec.consId)}</td>
              <td>{truncate(saleRec.carrierId)}</td>
              <td>{truncate(saleRec.ticketNo)}</td>
              <td>{truncate(saleRec.from)}</td>
              <td>{truncate(saleRec.to)}</td>
              <td>{truncate(saleRec.fare)}</td>
              <td>{truncate(saleRec.tax1)}</td>
              <td>{truncate(saleRec.tax2)}</td>
              <td>{truncate(saleRec.tax3)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.saleRec({ id: saleRec.id })}
                    title={'Show saleRec ' + saleRec.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link> 
                  {hasRole('admin') && (  
                    <>
                      <Link
                        to={routes.editSaleRec({ id: saleRec.id })}
                        title={'Edit saleRec ' + saleRec.id}
                        className="rw-button rw-button-small rw-button-blue"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        title={'Delete saleRec ' + saleRec.id}
                        className="rw-button rw-button-small rw-button-red"
                        onClick={() => onDeleteClick(saleRec.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SaleRecsList
