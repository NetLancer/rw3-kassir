import { Link, routes } from '@redwoodjs/router' 
import EmployeeCell from 'src/components/Employee/EmployeeCell' 
import { MetaTags } from '@redwoodjs/web'

const EmployeePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Employee" description="Employee page" />

      <h3 className="pl-4 mt-4 text-cyan-900">
        <Link to={routes.employees()}><b className="text-3xl">↶</b> <i><small>View All Employees</small></i></Link>
      </h3>
      <EmployeeCell id={id} />
    </>
  )
}

export default EmployeePage
