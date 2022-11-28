import { Link, routes } from '@redwoodjs/router' 
import SaleRecCell from 'src/components/SaleRec/SaleRecCell'

const SaleRecPage = ({ id }) => {
  return ( 
    <> 
      <div className="pl-6 pb-2"><Link to={routes.saleRecs()}><b className="text-3xl text-cyan-900">↶</b><small><i>All Records</i></small></Link></div>
      <SaleRecCell id={id} />
    </>
  )
}

export default SaleRecPage
