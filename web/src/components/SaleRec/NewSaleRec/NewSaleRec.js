import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleRecNewForm from 'src/components/SaleRec/SaleRecForm/SaleRecNewForm'

const CREATE_SALE_REC_MUTATION = gql`
  mutation CreateSaleRecMutation($input: CreateSaleRecInput!) {
    createSaleRec(input: $input) {
      id
    }
  }
`

////////////////////////////////////////////////
///////////////////////////
const NewSaleRec = () => {
  const [createSaleRec, { loading, error }] = useMutation(
    CREATE_SALE_REC_MUTATION,
    {
      onCompleted: () => {
        toast.success('SaleRec created')
        navigate(routes.saleRecs())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createSaleRec({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Sale Record</h2>
      </header>
      <div className="rw-segment-main">
        <SaleRecNewForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSaleRec
