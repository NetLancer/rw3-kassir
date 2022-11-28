import { Link, routes } from '@redwoodjs/router'



const Pagination = ({ recsCount, pageNumber, pageRecsNum, recsPerPage }) => { 
  if (!recsPerPage || !pageNumber) {
    alert('No RecsPerPage And/Or PageNumber defined!')
    return
  } 
  
  pageNumber = parseInt(pageNumber)
  const pages = []

  for (let i = 0; i < Math.ceil(recsCount / recsPerPage); i++) {
    pages.push(
      <li 
        key={i}
        className="inline-block mx-0 text-indigo-400"
      >
        <Link 
          to={routes.saleRecs({ pgNum: i + 1 })}
          className={
            pageNumber === i + 1 ? 'py-1 px-3 bg-slate-500 text-indigo-700 text-lg border rounded-full' : 'py-1 px-3'
          }
        >
          {i + 1}
        </Link>
      </li>
    )
  }

  return (
    <div className="mt-8">
      <h2>Pagination <small> <i className="text-zinc-500">({pageRecsNum} Of-total: {recsCount})</i></small></h2>
      <ul className="list-none text-center">{pages}</ul>
    </div>
  )
}

export default Pagination