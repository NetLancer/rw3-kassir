import { db } from 'src/lib/db'

export const airCarriers = ({ activeOnly = true }) => { 
  const isActiveOnly = activeOnly ? true : undefined 
  
  return db.airCarrier.findMany({
    where: { active: isActiveOnly }
  })
}

export const airCarrier = ({ id }) => {
  return db.airCarrier.findUnique({
    where: { id },
  })
}

export const createAirCarrier = ({ input }) => {
  return db.airCarrier.create({
    data: input,
  })
}

export const updateAirCarrier = ({ id, input }) => {
  return db.airCarrier.update({
    data: input,
    where: { id },
  })
}

export const deleteAirCarrier = ({ id }) => {
  return db.airCarrier.delete({
    where: { id },
  })
}

export const AirCarrier = {
  consolidators: (_obj, { root }) => {
    return db.airCarrier.findUnique({ where: { id: root?.id } }).consolidators()
  },
  salesRec: (_obj, { root }) => {
    return db.airCarrier.findUnique({ where: { id: root?.id } }).salesRec()
  },
}
