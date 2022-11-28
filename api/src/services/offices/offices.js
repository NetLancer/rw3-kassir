import { db } from 'src/lib/db'

export const offices = ({ activeOnly = true }) => { 
  const isActiveOnly = activeOnly ? true : undefined
  return db.office.findMany({
    where: {
      active: isActiveOnly
    },
  })
}

export const office = ({ id }) => {
  return db.office.findUnique({
    where: { id },
  })
}

export const createOffice = ({ input }) => {
  return db.office.create({
    data: input,
  })
}

export const updateOffice = ({ id, input }) => {
  return db.office.update({
    data: input,
    where: { id },
  })
}

export const deleteOffice = ({ id }) => {
  return db.office.delete({
    where: { id },
  })
}

export const Office = {
  manager: (_obj, { root }) => {
    return db.office.findUnique({ where: { id: root?.id } }).manager()
  },
  employees: (_obj, { root }) => {
    return db.office.findUnique({ where: { id: root?.id } }).employees()
  },
  salesRec: (_obj, { root }) => {
    return db.office.findUnique({ where: { id: root?.id } }).salesRec()
  },
}
