import { LeftColumn } from '../Components/LeftColumn'
import Navbar from '../Components/Navbar'
import RightColumn from '../Components/RightColumn'
import Sidebar from '../Components/Sidebar'
import InstanceEditor from '../Components/InstanceEditor';

function InstancePage() {
  return (
    <main className='flex'>
      <Sidebar/>
      <div className='flex flex-col flex-1 relative'>
        <Navbar />
        <div className='w-full'>
        <InstanceEditor/>
        </div>
    </div>
    </main>
  )
}

export default InstancePage