// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.

import { Router, Route, Private, Set } from '@redwoodjs/router' 
import RolesRedirect from 'src/RolesRedirect' 
// import LoginRedirect from 'src/LoginRedirect'  

import BlogLayout from 'src/layouts/BlogLayout'
import SaleRecsLayout from 'src/layouts/SaleRecsLayout'
import PostsLayout from 'src/layouts/PostsLayout'
import EmployeesLayout from 'src/layouts/EmployeesLayout' 


const Routes = () => { 

  return (
    <Router>  
      <Set wrap={RolesRedirect} private unauthenticated="login" allowedRole="admin"> 
        <Route path="/sale-recs/report" page={SaleReportPage} name="saleReport" /> 
      </Set> 
      
      <Set wrap={SaleRecsLayout}>
        <Route path="/sale-recs/{id:Int}" page={SaleRec_SaleRecPage} name="saleRec" />
        <Route path="/sale-recs" page={SaleRec_SaleRecsPage} name="saleRecs" />
      </Set> 
      
      <Set wrap={SaleRecsLayout} private unauthenticated="home" roles={['admin', 'kassir']}> 
        <Route path="/sale-recs/new" page={SaleRec_NewSaleRecPage} name="newSaleRec" /> 
      </Set>
      <Set wrap={SaleRecsLayout} private unauthenticated="login" allowedRole="admin">
        <Route path="/sale-recs/{id:Int}/edit" page={SaleRec_EditSaleRecPage} name="editSaleRec" /> 
      </Set> 
      
      <Set wrap={EmployeesLayout} private unauthenticated="login" allowedRole="admin">
        <Route path="/admin/employees" page={Employee_EmployeesPage} name="employees" />
        <Route path="/admin/employees/{id:Int}" page={Employee_EmployeePage} name="employee" />    
        <Route path="/admin/employees/{id:Int}/edit" page={Employee_EditEmployeePage} name="editEmployee" /> 
        <Route path="/admin/employees/new" page={Employee_NewEmployeePage} name="newEmployee" />
      </Set>

        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" /> 

      <Set wrap={BlogLayout}>
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

// .35  
//
