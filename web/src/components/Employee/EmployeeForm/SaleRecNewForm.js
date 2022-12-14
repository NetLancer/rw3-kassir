import {
  Form, 
  FieldError,
  Label,
  TextField, 
  SelectField, 
  Submit,
} from '@redwoodjs/forms'
import DatePicker from 'react-date-picker' 
import { useState } from 'react' 
import LabelGen from 'src/components/LabelGen' 

import OfficesQryCell from 'src/components/SaleRec/OfficesQryCell' 
import EmployeesQryCell from 'src/components/SaleRec/EmployeesQryCell' 
import ConsolidatorsQryCell from 'src/components/SaleRec/ConsolidatorsQryCell' 
import CarriersQryCell from 'src/components/SaleRec/CarriersQryCell' 

// import { useQuery } from '@redwoodjs/web' 
// import { QUERY as EmployeesQuery } from 'src/components/SaleRec/EmployeesQryCell' 
// const { loading, error, data:employeesData } = useQuery(EmployeesQuery) 

/////////////////////////////////////
////////////////// New Record Form 

const SaleRecNewForm = (props) => {
  //
  const onSubmit = (data) => { 
    data.date = dateValue.toJSON() 
    // console.log('Forms attempt at saving the following: ', data) 
    props.onSave(data)
  } 
  
  
  ///////////// STATES /////////////
  const [dateValue, setDateValue] = useState(new Date()) 
  
  const [officeId, setOfficeId] = useState(1) 
  const [consId, setConsId] = useState(1) 
 

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
        <OfficesQryCell onOfficeSelect={e => {setOfficeId(e.target.value)}} /> 
        
        <LabelGen name="employeeId">Employee Id</LabelGen>  
        <EmployeesQryCell officeId={officeId} />
        
        <LabelGen name="consId">ConsolidatorId</LabelGen> 
        <ConsolidatorsQryCell onConsSelect={c => {setConsId(c.target.value)}} />

        <LabelGen name="carrierId">Carrier Id</LabelGen> 
        <CarriersQryCell consId={consId} />
        
        <LabelGen name="ticketNo">Ticket No</LabelGen>
        <TextField
          name="ticketNo"
          className="rw-input"
        />
        
        <LabelGen name="from">From</LabelGen>
        <TextField
          name="from"
          className="rw-input"
          validation={{ required: false }}
        />

        <LabelGen name="to">To</LabelGen>
        <TextField
          name="to"
          className="rw-input"
          validation={{ required: false }}
        />

        <LabelGen name="fare">Fare</LabelGen>
        <TextField
          name="fare"
          className="rw-input"
          validation={{ valueAsNumber: true, required: true }}
        />

        <LabelGen name="tax1">Tax1</LabelGen>
        <TextField
          name="tax1"
          className="rw-input"
          validation={{ valueAsNumber: true }}
        />

        
        <LabelGen name="tax2">Tax2</LabelGen>
        <TextField
          name="tax2"
          className="rw-input"
          validation={{ valueAsNumber: true }}
        />
          
        <LabelGen name="tax3">Tax3</LabelGen>
        <TextField
          name="tax3"
          className="rw-input"
          validation={{ valueAsNumber: true }}
        /> 
        
        <FieldError name="tax3" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SaleRecNewForm

