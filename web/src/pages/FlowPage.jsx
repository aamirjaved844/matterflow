import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Workspace from '../Components/Workspace';
import { useParams } from "react-router-dom";

function FlowPage() {
  return (
    <main className='flex'>
      <Sidebar/>
      <div className='flex flex-col flex-1 relative'>
        <Navbar />
        <div className='grid md:grid-cols-1 grid-cols-1 w-full'>
          <Container fluid={true} className="App ">
            <Workspace params={useParams()}/>
          </Container>
        </div>
      </div>
    </main>
  )
}


export default FlowPage
