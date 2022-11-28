import { Link, routes } from '@redwoodjs/router' 
import { MetaTags } from '@redwoodjs/web' 
import { useState, useEffect } from 'react' 
import SaleReportCell from 'src/components/SaleReportCell' 

import { Toaster, toast } from '@redwoodjs/web/toast'
import Popup from 'reactjs-popup' 
import SaleReportForm from 'src/components/SaleReport/SaleReportForm'
import './modal.css'

const PopupContentWrap = ({children}) => <div style={{ border: '2px dotted gray', padding: '1.5rem 0.5rem', borderRadius: '0.5rem' }}>{children}</div> 

////////////////////////
const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1) 
//////////////////////// 


////////////////////////////////////////
////////////// MAIN FUNC:
const SaleReportPage = ({ pgNum = 1 }) => {     
  
  const [searchParams, setSearchParams] = useState({
    dateFrom: undefined, 
    dateTo: undefined, 
    officeId: undefined, 
    dateOrder: undefined
  })
  
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [recsNum, setRecsNum] = useState(null) // Number of records found using criteria
  
  const setRecordsNumber = (num) => { 
    setTimeout(() => setIsDataLoading(false), 200) 
    
    if (num !== recsNum) setRecsNum(num) 
    if (num === 0) {
      toast.error('No record foound, sorry :(', {duration: 1500})
      // setTimeout(() => setModalOpen(true), 1500)
    } 
    
  }  
  
   
    const setParams = (dateFromVal, dateToVal, officeId, dateOrder) => {
//    console.log('Params Set: ', dateFromVal.toJSON(), ' | ', dateToVal.toJSON(), ' | ', officeId, ' | ', 'DateOrderLength: ', dateOrder, dateOrder.length) 
    if (officeId) officeId = parseInt(officeId) 
    
    setSearchParams({ 
      dateFrom: dateFromVal.toJSON(), 
      dateTo: dateToVal.toJSON(), 
      officeId: officeId,
      dateOrder: dateOrder
    }) 
    
    setIsDataLoading(true)
  } 
  
  
  const ControlledModal = ({isOpen}) => { 
    
    const [modalOpen, setModalOpen] = useState(false)
    const closeModal = () => setModalOpen(false) 
  
    useEffect(() => {
     if (!isDataLoading) setModalOpen(isOpen) 
     
     return () => isOpen = null // SEE IF IT WORKS OK ..
    }, [isOpen])
  

    return (
      <Popup open={modalOpen} trigger={<button className="button openmodal outline-none"> Open Modal </button>} modal> 
        {close => (
          <PopupContentWrap> 
            <div id="overlay"></div> 
              <section className="relative z-50">
                <SaleReportForm close={() => close()} settingParams={setParams} /> 
                <button
                  className="button"
                  onClick={() => {close()}}
                >
                  [X]
                </button> 
              </section>
          </PopupContentWrap>
        )}
      </Popup> 
    )   
  }
  
  const isModalOpen = (!isDataLoading && !recsNum) ? true : false
  // // // //
  return (
    <>
      <MetaTags title="SaleReport" description="SaleReport page" />
      <h1 className="pt-6 text-center text-slate-600"><b>SaleReportPage</b></h1> 
      <Toaster /> 
      

      
      <div className="inline-block ml-6 mb-2 px-4 py-2 bg-lime-300 border rounded-lg">
        <ControlledModal isOpen={isModalOpen} /> 
      </div>
      <div className="pl-6 pb-2"><Link to={routes.saleRecs()}><b className="text-lg text-cyan-900">View All records</b></Link></div> 
      
      {(searchParams.dateFrom && searchParams.dateTo) && 
        <SaleReportCell 
          dateFrom={searchParams.dateFrom} 
          dateTo={searchParams.dateTo} 
          officeId={searchParams.officeId} 
          dateOrder={searchParams.dateOrder} 
           
          recsfound={setRecordsNumber} 
        /> 
      }
    </>
  )
}

export default SaleReportPage


//    const date1 = dateFrom.toISOString() 
//    dateTo.setTime(dateTo.getTime() + 86385000) // set time to 23:59:45 -- end of the day 
//    const date2 = dateTo.toISOString() 

