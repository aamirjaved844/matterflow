import { Link } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FlowsPage from './pages/FlowsPage.jsx'
import FlowPage from './pages/FlowPage.jsx'
import UrlParamsTest from './Components/UrlParamsTest.jsx'
import ConnectionsPage from './pages/ConnectionsPage.jsx'
import ConnectionFormPage from './pages/ConnectionFormPage.jsx'
import ProcessesPage from './pages/ProcessesPage.jsx'
import ModelsPage from './pages/ModelsPage.jsx'
import ModelPage from './pages/ModelPage.jsx'
import InstancesPage from './pages/InstancesPage.jsx'
import InstancePage from './pages/InstancePage.jsx'

const routes = [
    {
      path:"/",
      element: <HomePage/>
    },
    {
      path:"/connections",
      element: <ConnectionsPage />
    },
    {
      path:"/connections/edit",
      element: <ConnectionFormPage />
    },
    {
      path:"/connections/edit/:connection_id",
      element: <ConnectionFormPage />
    },
    {
      path:"/flows",
      element: <FlowsPage/>
    },
    {
      path:"/flows/edit",
      element: <FlowPage/>
    },
    {
      path:"/flows/edit/:flow_id",
      element: <FlowPage/>
    },
    {
      path:"/processes",
      element: <ProcessesPage />
    },
    {
      path:"/models",
      element: <ModelsPage/>
    },
    {
      path:"/models/edit",
      element: <ModelPage />
    },
    {
      path:"/models/edit/:model_id",
      element: <ModelPage />
    },
    {
      path:"/instances",
      element: <InstancesPage/>
    },
    {
      path:"/instances/edit",
      element: <InstancePage />
    },
    {
      path:"/instances/edit/:instance_id",
      element: <InstancePage />
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