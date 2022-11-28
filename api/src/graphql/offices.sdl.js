export const schema = gql`
  type Office {
    id: Int!
    region: String!
    address: String!
    cName: String 
    active: Boolean!
    manager: Employee
    managerId: Int
    staffNum: Int
    employees: [Employee]!
    salesRec: [SaleRec]! 
    comment: String 
  }

  type Query {
    offices(activeOnly: Boolean): [Office!]! @skipAuth
    office(id: Int!): Office @skipAuth
  }

  input CreateOfficeInput {
    region: String!
    address: String!
    cName: String 
    active: Boolean!
    managerId: Int
    staffNum: Int 
    comment: String 
  }

  input UpdateOfficeInput {
    region: String
    address: String
    cName: String 
    active: Boolean 
    managerId: Int
    staffNum: Int
    comment: String
  }

  type Mutation {
    createOffice(input: CreateOfficeInput!): Office! @requireAuth(roles: "admin")
    updateOffice(id: Int!, input: UpdateOfficeInput!): Office! @requireAuth(roles: "admin")
    deleteOffice(id: Int!): Office! @requireAuth(roles: "admin")
  }
`
