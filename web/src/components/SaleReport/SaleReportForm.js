import {
  Form,
  FieldError,
  TextField, 
  SelectField, 
  RadioField,
  Submit,
} from '@redwoodjs/forms'
import DatePicker from 'react-date-picker' 
import { useState, useEffect } from 'react' 

import OfficesQryCell from 'src/components/SaleRec/OfficesQryCell' 
import LabelGen from 'src/components/LabelGen' 

////////////////////////////////////////
////////////////////
const SaleReportForm = (props) => { 
  ////////////////////////
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  //////////////////////// 
  
  const [dateFromVal, setDateFromVal] = useState(yesterday) 
  const [dateToVal, setDateToVal] = useState(today) 
  const [officeId, setOfficeId] = useState() 
  
  const onSubmit = (data) => { 
    //
    if (dateFromVal) data.dateFrom = dateFromVal 
    if (dateToVal) data.dateTo = dateToVal
    const dateOrder = data?.dateOrder 
    
    props.settingParams(dateFromVal, dateToVal, officeId, dateOrder)
    props.close()
    // props.onSave(data, props?.saleRec?.id)
  } 
  
  // Testing: 
    const SortOrderChangeLog = (evt) => { 
    const val = (evt.target.value !== '') ? evt.target.value : 'NoOrder' 
    console.log('SortOrderChangeDD: ', val)
  }
  //
  return (
    <div className="rw-form-wrapper z-50">
      <Form onSubmit={onSubmit} error={props.error}> 
      
        <LabelGen name="officeId">Office Id</LabelGen>
        <OfficesQryCell filterControl={true} onOfficeSelect={(e) => {setOfficeId(e.target.value)}} /> 
      
        <LabelGen name="dateFrom">Date From</LabelGen>
        <DatePicker 
          name="dateFrom" 
          format={"dd-MM-y"}
          onChange={(val) => setDateFromVal(val)}
          value={dateFromVal} 
          className="rw-input"
        /> 
        
        <LabelGen name="dateTo">Date To</LabelGen>
        <DatePicker 
          name="dateTo" 
          format={"dd-MM-y"}
          onChange={(val) => setDateToVal(val)}
          value={dateToVal} 
          className="rw-input"
        /> 
        
        <div id="dataOrdering" className="mt-8"> 
          <table className="mx-auto w-max"> 
            <caption className="font-bold">Select Ordering</caption>
            <thead>
              <tr className="with-icons">
                <th>None <span>&#10539;</span></th>
                <th>&nbsp;&nbsp;&nbsp; Asc <span>&#10514;</span></th> 
                <th>&nbsp;&nbsp;&nbsp; Desc <span>&#10515;</span></th>
              </tr>
            </thead> 
            <tbody>
              <tr className="checkboxes">
                <td><RadioField id="dateOrder-0" name="dateOrder" value="" onChange={SortOrderChangeLog} defaultChecked={true} /></td>
                <td><RadioField id="dateOrder-1" name="dateOrder" value="asc" onChange={SortOrderChangeLog} /></td>
                <td><RadioField id="dateOrder-2" name="dateOrder" value="desc" onChange={SortOrderChangeLog} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <br /> 
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Submit!
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SaleReportForm 






// Cut out .. 
//
//<SelectField 
//  name="dateOrder2" 
//  defaultValue={''}
//  // onChange={(v) => setDateOrder(v)} 
//  onChange={SortOrderChange}
//  className="rw-input" 
//> 
//  <option value="desc">Descending</option> 
//  <option value="asc">Ascending</option> 
//  <option value="">Unordered</option> 
//</SelectField> 


