import { db } from 'src/lib/db'

////////////////////////
//const today = new Date()
//const yesterday = new Date(today)
//yesterday.setDate(yesterday.getDate() - 1)
////////////////////////


export const saleRecs = ({ pgNum = 1, recsPerPage }) => { 
  const offset = (pgNum - 1) * recsPerPage 
  
  return {
    recs: db.saleRec.findMany({
      take: recsPerPage,
      skip: offset, 
      orderBy: { date: 'desc' },
    }),
    count: db.saleRec.count(),
  }
}

///////////////////////
/////////////
export const saleRecsFiltered = ({ dateFrom, dateTo, officeId, dateOrder }) => { 
  const orderByDate = dateOrder ? dateOrder : undefined 
  const office = officeId ? officeId : undefined
  
  return db.saleRec.findMany({
      where: {
        date: { 
          gte: dateFrom, 
          lte: dateTo 
        }, 
        officeId: office
      }, 
      orderBy: { date: orderByDate }, 
    })
}


export const saleRec = ({ id }) => {
  return db.saleRec.findUnique({
    where: { id },
  })
}

export const createSaleRec = ({ input }) => {
  return db.saleRec.create({
    data: input,
  })
}

export const updateSaleRec = ({ id, input }) => {
  return db.saleRec.update({
    data: input,
    where: { id },
  })
}

export const deleteSaleRec = ({ id }) => {
  return db.saleRec.delete({
    where: { id },
  })
}

export const SaleRec = {
  office: (_obj, { root }) => {
    return db.saleRec.findUnique({ where: { id: root?.id } }).office()
  },
  agent: (_obj, { root }) => {
    return db.saleRec.findUnique({ where: { id: root?.id } }).agent()
  },
  consolidator: (_obj, { root }) => {
    return db.saleRec.findUnique({ where: { id: root?.id } }).consolidator()
  },
  carrier: (_obj, { root }) => {
    return db.saleRec.findUnique({ where: { id: root?.id } }).carrier()
  },
}
