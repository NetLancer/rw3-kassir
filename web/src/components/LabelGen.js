import { Label } from '@redwoodjs/forms'

const LabelGen = ({ name, cs, children }) => { 
  // const classes = cs ? `rw-form-wrapper ${cs}` : "rw-form-wrapper" 
  return (
    <Label name={name} className={cs} errorClassName="rw-label rw-label-error">{children}</Label>
  )
} 

export default LabelGen