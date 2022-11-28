export const schema = gql`
  type AirCarrier {
    id: Int!
    name: String
    codeName: String! 
    active: Boolean!
    docNumber: String!
    consolidators: [Consolidator]!
    info: String
    salesRec: [SaleRec]!
  }

  type Query {
    airCarriers(activeOnly: Boolean): [AirCarrier!]! @skipAuth
    airCarrier(id: Int!): AirCarrier @skipAuth
  }

  input CreateAirCarrierInput {
    name: String
    codeName: String! 
    active: Boolean!
    docNumber: String!
    info: String
  }

  input UpdateAirCarrierInput {
    name: String
    codeName: String 
    active: Boolean 
    docNumber: String
    info: String
  }

  type Mutation {
    createAirCarrier(input: CreateAirCarrierInput!): AirCarrier! @requireAuth(roles: "admin")
    updateAirCarrier(id: Int!, input: UpdateAirCarrierInput!): AirCarrier!
      @requireAuth(roles: "admin")
    deleteAirCarrier(id: Int!): AirCarrier! @requireAuth(roles: "admin")
  }
`
