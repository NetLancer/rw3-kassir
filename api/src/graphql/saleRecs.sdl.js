export const schema = gql`
  type SaleRec {
    id: Int!
    date: DateTime!
    office: Office!
    officeId: Int!
    agent: Employee!
    employeeId: Int!
    consolidator: Consolidator!
    consId: Int!
    carrier: AirCarrier!
    carrierId: Int!
    ticketNo: String
    from: String!
    to: String!
    fare: Float!
    tax1: Float
    tax2: Float
    tax3: Float 
    curAgent: Int
  }
  
  type SaleRecPage {
    recs: [SaleRec!]! 
    count: Int!
  }
  
  
  type Query { 
    saleRecs(pgNum: Int, recsPerPage: Int!): SaleRecPage @skipAuth 
    saleRecsFiltered(dateFrom: DateTime!, dateTo: DateTime!, officeId: Int, dateOrder: String): [SaleRec!]! @skipAuth 
    saleRec(id: Int!): SaleRec @skipAuth
  }

  input CreateSaleRecInput {
    date: DateTime!
    officeId: Int!
    employeeId: Int!
    consId: Int!
    carrierId: Int!
    ticketNo: String
    from: String!
    to: String!
    fare: Float!
    tax1: Float
    tax2: Float
    tax3: Float 
    curAgent: Int
  }

  input UpdateSaleRecInput {
    date: DateTime
    officeId: Int
    employeeId: Int
    consId: Int
    carrierId: Int
    ticketNo: String
    from: String
    to: String
    fare: Float
    tax1: Float
    tax2: Float
    tax3: Float
  }

  type Mutation {
    createSaleRec(input: CreateSaleRecInput!): SaleRec! @requireAuth(roles: ["kassir", "admin"])
    updateSaleRec(id: Int!, input: UpdateSaleRecInput!): SaleRec! @requireAuth(roles: "admin")
    deleteSaleRec(id: Int!): SaleRec! @requireAuth(roles: "admin")
  }
`

// saleRecPage(pgNum: Int): SaleRecPage 
// saleRecsFiltered(dateFrom: DateTime!, dateTo: DateTime!, officeId: Int, dateOrder: String): [SaleRec!]! @skipAuth 