// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web' 
import { Form, CheckboxField, Submit } from '@redwoodjs/forms' 
import LabelGen from 'src/components/LabelGen' 
import { useAuth } from '@redwoodjs/auth' 

import { useState, useEffect } from 'react' 
import EmployeesCell from 'src/components/Employee/EmployeesCell' 
import OfficesQryCell from 'src/components/SaleRec/OfficesQryCell'

///////////////////////////
///////////////
const EmployeesPage = () => { 
  // 
  const { hasRole } = useAuth() 
  if (!hasRole('admin')) { 
    window.history.back() 
    // setTimeout(() => console.warn('Unauthorized for Employees resource!'), 750)
  }
  
  const [activeSelect, setActiveSelect] = useState(true) 
  const [officeAttached, setOfficeAttached] = useState(0) 
  
    
  return (
    <>
      <MetaTags title="Employees" description="Employees page" />
      
      <Form> 
        <section className="mb-4 flex justify-start">
          <div className="text-center relative"> 
            <LabelGen name="activeSelect" cs="border rounded-2xl p-2">Active only</LabelGen> 
            <br />
            <CheckboxField 
              checked={activeSelect}
              name="activeSelect"  
              className="absolute bottom-2" 
              onChange={() => {setActiveSelect(!activeSelect)}}
            /> 
          </div> 
          <div className="grow max-w-sm ml-12 text-center">
            <LabelGen name="officeId" cs="border rounded-2xl p-2">Office Attached</LabelGen> 
            <OfficesQryCell filterControl={true} activeOnly={true} onOfficeSelect={(e) => {setOfficeAttached(e.target.value)}} />
          </div> 
        </section>
      </Form> 
        
      <EmployeesCell activeOnly={activeSelect} officeId={parseInt(officeAttached)} />
    </>
  )
}

export default EmployeesPage
