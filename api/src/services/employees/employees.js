import { db } from 'src/lib/db'

export const employees = ({ activeOnly = true, officeId }) => { 
  const isActiveOnly = activeOnly ? true : undefined 
  const ifOfficeId = officeId ? officeId : undefined 
  
  return db.employee.findMany({
    where: {
      active: isActiveOnly, 
      officeId: ifOfficeId
    }, 
    orderBy: [
      {active: 'desc'}, 
      {fName: 'asc'},
    ],
  })
}

//export const employeesByOffice = ({ officeId }) => {
//  return db.employee.findMany({
//    where: { officeId }
//  })
//}

export const employeeSC = ({ id }) => {
  return {
    agent: db.employee.findUnique({
      where: { id }
    }), 
    salesCount: db.saleRec.count({ where: { agent: { id } } }),
  }
} 

export const employee = ({ id }) => {
  return db.employee.findUnique({
      where: { id }
    })
}


export const createEmployee = ({ input }) => {
  return db.employee.create({
    data: input,
  })
}

export const updateEmployee = ({ id, input }) => {
  return db.employee.update({
    data: input,
    where: { id },
  })
}

export const deleteEmployee = ({ id }) => {
  return db.employee.delete({
    where: { id },
  })
}

export const Employee = {
  officeAttached: (_obj, { root }) => {
    return db.employee.findUnique({ where: { id: root?.id } }).officeAttached()
  },
  managingOffice: (_obj, { root }) => {
    return db.employee.findUnique({ where: { id: root?.id } }).managingOffice()
  },
  salesRec: (_obj, { root }) => {
    return db.employee.findUnique({ where: { id: root?.id } }).salesRec()
  },
}


// ..for db.employee(specific) 
// count: db.saleRec.count({ where: { agent: { id: 3 } } }),