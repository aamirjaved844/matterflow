import Connections from '../Components/Connections'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

function ConnectionsPage() {
  return (
    <main className='flex'>
      <Sidebar/>
      <div className='flex flex-col flex-1 relative'>
        <Navbar />
        <div className='grid md:grid-cols-3 grid-cols-1 w-full'>
        <Connections/>
        </div>
      </div>
    </main>
  )
}

export default ConnectionsPage
