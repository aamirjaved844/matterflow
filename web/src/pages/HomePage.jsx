import { LeftColumn } from '../Components/LeftColumn'
import Navbar from '../Components/Navbar'
import RightColumn from '../Components/RightColumn'
import Sidebar from '../Components/Sidebar'

function HomePage() {
  return (
    <main className='flex'>
      <Sidebar/>
      <div className='flex flex-col flex-1 relative'>
        <Navbar />
        <div className='grid md:grid-cols-3 grid-cols-1 w-full'>
        <div className='col-span-2'>
          <LeftColumn />
        </div>
        <div className='w-full'>
          <RightColumn />
        </div>
      </div>
    </div>
    </main>
  )
}

export default HomePage
