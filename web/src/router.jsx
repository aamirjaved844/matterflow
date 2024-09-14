import { Link } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import UrlParamsTest from './Components/UrlParamsTest.jsx'

const routes = [
    {
      path:"/",
      element: <HomePage/>
    },  
    {
      path:"/:flow_id",
      element: <HomePage/>
    },          
    {
      path:"/urlparams/:name", // this is how we take in url params - we will useParams like this const {name} = useParams(); in the UrlParamsTest component
      element: <UrlParamsTest/>
    },
    {
      path:"/about",
      element: 
        <>
          <div>About Us</div>
          <Link to="/" relative="path">
            Home
          </Link> 
        </>
    }
  ]

export default routes