import Processes from '../Components/Processes'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

function ProcessesPage() {
  return (
    <main className='flex'>
      <Sidebar/>
      <div className='flex flex-col flex-1 relative'>
        <Navbar />
        <div className='grid md:grid-cols-3 grid-cols-1 w-full'>
        <Processes/>
        </div>
      </div>
    </main>
  )
}

export default ProcessesPage
