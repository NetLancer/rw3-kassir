export const schema = gql`
  type Employee {
    id: Int!
    fName: String!
    mi: String
    lName: String!
    cName: String
    dob: DateTime!
    active: Boolean!
    phoneNumber: String!
    isManager: Boolean
    bio: String
    worksSince: DateTime
    officeAttached: Office
    officeId: Int
    managingOffice: Office
    salesRec: [SaleRec]! 
    comment: String
  }

  type Agent {
    agent: Employee 
    salesCount: Int!
  }

  type Query {
    employees(activeOnly: Boolean, officeId: Int): [Employee!]! @skipAuth 
    
    employee(id: Int!): Employee @skipAuth
    employeeSC(id: Int!): Agent @skipAuth
  }

  input CreateEmployeeInput {
    fName: String!
    mi: String
    lName: String!
    cName: String
    dob: DateTime!
    active: Boolean!
    phoneNumber: String!
    isManager: Boolean
    bio: String
    worksSince: DateTime
    officeId: Int
    comment: String
  }

  input UpdateEmployeeInput {
    fName: String
    mi: String
    lName: String
    cName: String
    dob: DateTime
    active: Boolean
    phoneNumber: String
    isManager: Boolean
    bio: String
    worksSince: DateTime
    officeId: Int
    comment: String
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee! @requireAuth(roles: "admin")
    updateEmployee(id: Int!, input: UpdateEmployeeInput!): Employee!
      @requireAuth(roles: "admin")
    deleteEmployee(id: Int!): Employee! @requireAuth(roles: "admin")
  }
`

// employeesByOffice(officeId: Int!): [Employee!]! @skipAuth /* l.28 */