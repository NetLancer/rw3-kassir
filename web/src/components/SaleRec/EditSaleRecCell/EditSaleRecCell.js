import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleRecEditForm from 'src/components/SaleRec/SaleRecForm/SaleRecEditForm'

export const QUERY = gql`
  query EditSaleRecById($id: Int!) {
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
const UPDATE_SALE_REC_MUTATION = gql`
  mutation UpdateSaleRecMutation($id: Int!, $input: UpdateSaleRecInput!) {
    updateSaleRec(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

////////////////////////////////////////////
///////////////////////
export const Success = ({ saleRec }) => {
  const [updateSaleRec, { loading, error }] = useMutation(
    UPDATE_SALE_REC_MUTATION,
    {
      onCompleted: () => {
        toast.success('SaleRec updated!')
        navigate(routes.saleRecs())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

 
  const onSave = (input, id) => {
    updateSaleRec({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header"> 
        <h2 className="rw-heading rw-heading-secondary pl-4">
          Edit SaleRecord ID: {saleRec?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SaleRecEditForm
          saleRec={saleRec}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
