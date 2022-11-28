export const schema = gql`
  type Consolidator {
    id: Int!
    region: String!
    address: String!
    cName: String
    name: String! 
    active: Boolean! 
    info: String
    carriers: [AirCarrier]!
    salesRec: [SaleRec]! 
    comment: String
  }

  type Query {
    consolidators(activeOnly: Boolean): [Consolidator!]! @skipAuth
    consolidator(id: Int!): Consolidator @skipAuth
  }

  input CreateConsolidatorInput {
    region: String!
    address: String!
    cName: String
    name: String! 
    active: Boolean! 
    info: String 
    comment: String
  }

  input UpdateConsolidatorInput {
    region: String
    address: String
    cName: String
    name: String 
    active: Boolean 
    info: String 
    comment: String
  }

  type Mutation {
    createConsolidator(input: CreateConsolidatorInput!): Consolidator!
      @requireAuth(roles: "admin")
    updateConsolidator(
      id: Int!
      input: UpdateConsolidatorInput!
    ): Consolidator! @requireAuth(roles: "admin")
    deleteConsolidator(id: Int!): Consolidator! @requireAuth(roles: "admin")
  }
`
