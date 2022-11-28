import { Redirect, routes } from '@redwoodjs/router'
// import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => <Redirect to={routes.saleRecs()} />

export default HomePage


//return (
//    <>
//      <MetaTags title="Home" description="Home page" />
//      <ArticlesCell />
//    </>
//  )
