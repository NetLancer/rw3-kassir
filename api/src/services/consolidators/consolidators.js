import { db } from 'src/lib/db'

export const consolidators = ({ activeOnly = true }) => { 
  const isActiveOnly = activeOnly ? true : undefined 
  
  return db.consolidator.findMany({
    where: { active: isActiveOnly }
  })
}

export const consolidator = ({ id }) => {
  return db.consolidator.findUnique({
    where: { id },
  })
}

export const createConsolidator = ({ input }) => {
  return db.consolidator.create({
    data: input,
  })
}

export const updateConsolidator = ({ id, input }) => {
  return db.consolidator.update({
    data: input,
    where: { id },
  })
}

export const deleteConsolidator = ({ id }) => {
  return db.consolidator.delete({
    where: { id },
  })
}

export const Consolidator = {
  carriers: (_obj, { root }) => {
    return db.consolidator.findUnique({ where: { id: root?.id } }).carriers()
  },
  salesRec: (_obj, { root }) => {
    return db.consolidator.findUnique({ where: { id: root?.id } }).salesRec()
  },
}
