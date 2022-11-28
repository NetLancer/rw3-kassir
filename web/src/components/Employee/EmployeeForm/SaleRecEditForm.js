import {
  Form, 
  FieldError,
  Label,
  TextField, 
  SelectField, 
  Submit,
} from '@redwoodjs/forms'
import DatePicker from 'react-date-picker' 
import { useState, useEffect } from 'react' 
import LabelGen from 'src/components/LabelGen' 

import OfficesQryCell from 'src/components/SaleRec/OfficesQryCell' 
import EmployeesQryCell from 'src/components/SaleRec/EmployeesQryCell' 
import ConsolidatorsQryCell from 'src/components/SaleRec/ConsolidatorsQryCell' 
import CarriersQryCell from 'src/components/SaleRec/CarriersQryCell' 
// import { useQuery } from '@redwoodjs/web' 
// import { QUERY as EmployeesQuery } from 'src/components/SaleRec/EmployeesQryCell' 


/////////////////////////////////////
//////////////////
const SaleRecEditForm = (props) => {
  
  if (!props) {
    console.log('No props passed to SaleRecEditForm !!') 
    return
  } 
  const EDIT_MODE = true 
  
  const { saleRec } = props 
  
  const onSubmit = (data) => { 
    data.date = dateValue.toJSON() 
    // console.log('Forms attempt at saving the following: ', data) 
    props.onSave(data, saleRec?.id)
  } 
  
  ///////////// STATES /////////////
  const [dateValue, setDateValue] = useState(saleRec?.date ? new Date(saleRec.date) : new Date()) 
  
  const [officeId, setOfficeId] = useState(saleRec?.officeId) 
  const [consId, setConsId] = useState(saleRec?.consId) 
 

// const { loading, error, data:employeesData } = useQuery(EmployeesQuery) 
// toDateString toISOString toUTCString toLocaleDateString toLocaleString toJSON
//
  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit}>
        
        <LabelGen name="date">Date</LabelGen>
        <DatePicker 
          name="date" 
          format={"dd-MM-y"} 
          defaultValue={dateValue}
          onChange={(val) => setDateValue(val)} 
          value={dateValue}
          className="rw-input"
        /> 
        
           
        <LabelGen name="officeId" cs="yet-another-class">Office Id</LabelGen>  
        <OfficesQryCell ifOfficeId={saleRec.officeId} onOfficeSelect={e => {setOfficeId(e.target.value)}} /> 
        
        <LabelGen name="employeeId">Employee Id</LabelGen>   
        <EmployeesQryCell ifEmployeeId={saleRec.employeeId} officeId={officeId} />
        

        <LabelGen name="consId">ConsolidatorId</LabelGen> 
        <ConsolidatorsQryCell ifConsId={saleRec.consId} onConsSelect={c => {setConsId(c.target.value)}} />


        <LabelGen name="carrierId">Carrier Id</LabelGen> 
        <CarriersQryCell ifCarrierId={saleRec.carrierId} consId={consId} />

        
        <LabelGen name="ticketNo">Ticket No</LabelGen> 
        <TextField
          name="ticketNo"
          defaultValue={saleRec.ticketNo}
          className="rw-input"
        />
        
        <LabelGen name="from">From</LabelGen> 
        <TextField
          name="from"
          defaultValue={saleRec.from}
          className="rw-input"
          validation={{ required: false }}
        />

        <LabelGen name="to">To</LabelGen> 
        <TextField
          name="to"
          defaultValue={saleRec.to}
          className="rw-input"
          validation={{ required: false }}
        />

        <LabelGen name="fare">Fare</LabelGen> 
        <TextField
          name="fare"
          defaultValue={saleRec.fare}
          className="rw-input"
          validation={{ valueAsNumber: true, required: true }}
        />


        <LabelGen name="tax1">Tax1</LabelGen>
        <TextField
          name="tax1"
          defaultValue={saleRec.tax1}
          className="rw-input"
          validation={{ valueAsNumber: true }}
        />

        
        <LabelGen name="tax2">Tax2</LabelGen>
        <TextField
          name="tax2"
          defaultValue={saleRec.tax2}
          className="rw-input"
          validation={{ valueAsNumber: true }}
        />
        
        
        <LabelGen name="tax3">Tax3</LabelGen>
        <TextField
          name="tax3"
          defaultValue={saleRec.tax3}
          className="rw-input"
          validation={{ valueAsNumber: true }}
        /> 


        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SaleRecEditForm

// QUERY just in case 
//
//query Redwood {
//  offices {
//    id 
//    cName
//  } 
//  employees {
//    id 
//    cName
//  } 
//  consolidators {
//    id 
//    cName
//  } 
//  airCarriers { 
//  	id 
//    codeName
//  }
//}
