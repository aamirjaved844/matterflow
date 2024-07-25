import FlowForm from '../Components/FlowForm'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

function FlowFormPage() {
  return (
    <main className='flex'>
      <Sidebar/>
      <div className='flex flex-col flex-1 relative'>
        <Navbar />
        <div className='grid md:grid-cols-3 grid-cols-1 w-full'>
        <FlowForm/>
        </div>
      </div>
    </main>
  )
}

export default FlowFormPage
