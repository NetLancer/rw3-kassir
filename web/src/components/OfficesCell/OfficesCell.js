export const QUERY = gql`
  query OfficesQuery($activeOnly: Boolean) {
    offices(activeOnly: $activeOnly) {
      id
    }
  }
`
// export const beforeQuery = () => ({ variables: { activeOnly: true } })

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ offices }) => {
  return (
    <ul>
      {offices.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
