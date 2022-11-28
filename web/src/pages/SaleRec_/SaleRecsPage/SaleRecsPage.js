import { Link, routes } from '@redwoodjs/router' 
import { useAuth } from '@redwoodjs/auth' 

import SaleRecsCell from 'src/components/SaleRec/SaleRecsCell'
import Popup from 'reactjs-popup' 
import SaleReportForm from 'src/components/SaleReport/SaleReportForm'
// import './modal.css'

const RECS_PER_PAGE = 4 // Number of Records per Page

const PopupContentWrap = ({children}) => <div style={{ border: '2px dotted gray', padding: '1.5rem 0.5rem', borderRadius: '0.5rem' }}>{children}</div>

/////////////////////////////////////////
////////////////////////
const SaleRecsPage = ({ pgNum = 1 }) => { 
  // 
  const {isAuthenticated, hasRole} = useAuth()
  return ( 
    <> 
      {hasRole('admin') ? ( 
          <div className="pl-6 pb-2"><Link to={routes.saleReport()}><b className="text-base text-cyan-600">View SaleReport page</b></Link></div>
        ) : (
          <i className="block pl-6 pb-2 text-slate-400"><small>SaleReport page - admin access only</small></i>
        )
      }
      <SaleRecsCell pgNum={pgNum} recsPerPage={RECS_PER_PAGE} />
    </>
  )
}

export default SaleRecsPage

// Modal and scaffolding - candidate for deletion 
// have been copied over to SaleReportPage 


//const Modal = () => (
//  <Popup trigger={<button className="button"> Open Modal </button>} modal> 
//    {close => (
//      <PopupContentWrap>
//        <SaleReportForm /> 
//        <button
//          className="button"
//          onClick={() => {close()}}
//        >
//          [X]
//        </button> 
//      </PopupContentWrap>
//    )}
//  </Popup>
//)
