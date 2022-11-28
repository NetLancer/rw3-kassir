import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  CheckboxField,
  NumberField, 
  Submit,
} from '@redwoodjs/forms'
import {useState} from 'react' 
import OfficesQryCell from 'src/components/SaleRec/OfficesQryCell'
import LabelGen from 'src/components/LabelGen' 


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

///////////////////////////////////////////
////////////////////
const EmployeeForm = (props) => {
  const onSubmit = (data) => { 
    // console.log('Form Submitted Data: ', data)
    props.onSave(data, props?.employee?.id)
  }

  const [officeId, setOfficeId] = useState(props?.employee?.officeId ?? 1)

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        
        <LabelGen name="fName" cs="rw-label">First name</LabelGen>
        <TextField
          name="fName"
          defaultValue={props.employee?.fName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="fName" className="rw-field-error" />


        <LabelGen name="mi" cs="rw-label">MI</LabelGen>
        <TextField
          name="mi"
          defaultValue={props.employee?.mi}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="mi" className="rw-field-error" />


        <LabelGen name="lName" cs="rw-label">Last name</LabelGen>
        <TextField
          name="lName"
          defaultValue={props.employee?.lName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="lName" className="rw-field-error" />

        <LabelGen name="cName" cs="rw-label">CodeName</LabelGen>
        <TextField
          name="cName"
          defaultValue={props.employee?.cName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="cName" className="rw-field-error" />

        <LabelGen name="dob" cs="rw-label">DOB</LabelGen>
        <DatetimeLocalField
          name="dob"
          defaultValue={formatDatetime(props.employee?.dob)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="dob" className="rw-field-error" />

        <LabelGen name="active" cs="rw-label">Is Active</LabelGen>
        <CheckboxField
          name="active"
          defaultChecked={props.employee ? props.employee.active : true}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />


        <LabelGen name="phoneNumber" cs="rw-label">Phone Number</LabelGen>
        <TextField
          name="phoneNumber"
          defaultValue={props.employee?.phoneNumber}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="phoneNumber" className="rw-field-error" />

        <LabelGen name="isManager" cs="rw-label">Manager</LabelGen>
        <CheckboxField
          name="isManager"
          defaultChecked={props.employee?.isManager}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="isManager" className="rw-field-error" />

        <LabelGen name="bio" cs="rw-label">BIO</LabelGen>
        <TextField
          name="bio"
          defaultValue={props.employee?.bio}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="bio" className="rw-field-error" />

        <LabelGen name="worksSince" cs="rw-label">Works Since</LabelGen>
        <DatetimeLocalField
          name="worksSince"
          defaultValue={formatDatetime(props.employee?.worksSince)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="worksSince" className="rw-field-error" />


        <LabelGen name="officeId" cs="rw-label">Office ID</LabelGen>
        
        
        <OfficesQryCell ifOfficeId={props?.employee?.officeId} onOfficeSelect={e => {setOfficeId(e.target.value)}} />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EmployeeForm 

