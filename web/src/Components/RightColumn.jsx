import React from 'react'
import MyTransactions from './MyTransactions'
import MyAnalytics from './MyAnalytics'
import MyList from './MyList'
import SystemInfo from './SystemInfo'

const RightColumn = () => {
  return (
    <div className='w-full p-2'>
        <SystemInfo  />
        <MyTransactions />
        <MyAnalytics />
        <MyList />
    </div>
  )
}

export default RightColumn